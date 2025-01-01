import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { CGameEditorId } from "@root/app/common/components/gameEditorId/gameEditorId.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { CView } from "@root/app/common/components/view/view.component";
import { DIRECTION8_ANGLES } from "@root/app/common/constants/space.constants";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TEntityBuilder } from "@root/app/common/types/entityBuilder.types";
import { TOffset } from "@root/app/common/types/offset.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initBorderView } from "@root/app/common/views/utils/borderView/initBorderView";
import { initCenterView } from "@root/app/common/views/utils/centerView/initCenterView";
import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";
import { configManager } from "@root/app/core/configManager/configManager.singleton";
import { selectEntity } from "@root/app/editor/utils/common/selectEntity/selectEntity";
import { Graphics } from "pixi.js";
import { HITBOXES_POINTS } from "../../hitbox/constants/hitboxes.constants";
import { TPolygonHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveOffset } from "../../viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { VIEW_SORTING_CURVES } from "../../viewSortingCurve/constants/viewSortingCurve.constants";
import { initViewSortingCurveView } from "../../viewSortingCurve/utils/initViewSortingCurveView/initViewSortingCurveView";
import { CRockLG } from "../components/rockLG/rockLG.component";

export const createRockLG: TEntityBuilder = (
	coordinates: TCoordinates,
	variant: number,
	direction8: TDirection8,
	gameEditorId?: number,
) => {
	const name = `environment.rockLG.${variant}.${direction8}`;

	const sprite = initSprite(name, coordinates);

	let borderView: Graphics | null = null;
	let centerView: Graphics | null = null;
	let viewSortingCurveView: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		borderView = initBorderView(sprite, coordinates);
	}

	if (configManager.config.debug.showsEntityCenters) {
		centerView = initCenterView(name, coordinates);
	}

	const centerOffset = ENTITIES_CENTER_OFFSETS[name];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${name}".`);
	}

	const viewSortingCurveOffset: TOffset = {
		x: centerOffset.x,
		y: centerOffset.y,
	};

	const viewSortingCurve = VIEW_SORTING_CURVES[name];
	if (!viewSortingCurve) {
		throw new Error(`Missing view sorting curve for "${name}".`);
	}

	if (configManager.config.debug.showsViewSortingCurves) {
		viewSortingCurveView = initViewSortingCurveView(
			"characters.player",
			coordinates,
			viewSortingCurve,
			viewSortingCurveOffset,
		);
	}

	const rockLGEntity = entityManager.createEntity("rockLG", [
		// identity
		new CRockLG(),

		// misc
		new CLocation(coordinates),
		new CDirection(DIRECTION8_ANGLES[direction8]),
		new CVariant(variant),

		// view sorting curve
		new CViewSortingCurve(viewSortingCurve),
		new CViewSortingCurveOffset(viewSortingCurveOffset),
		new CViewSortingCurveView(viewSortingCurveView),

		// views
		new CView(sprite),
		new CBorderView(borderView),
		new CCenterView(centerView),
	]);

	if (gameEditorId) {
		rockLGEntity.addComponent(new CGameEditorId(gameEditorId));
	}

	sprite.interactive = true;
	sprite.onclick = () => selectEntity(rockLGEntity);

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: rockLGEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const motionHitboxSettings: TPolygonHitboxSettings = {
		shape:              "polygon",
		name:               name,
		type:               "motion",
		isActive:           true,
		initialCoordinates: coordinates,
		offset:             {
			x: centerOffset.x,
			y: centerOffset.y,
		},
		points: HITBOXES_POINTS[name],
	};

	// motion hitbox
	createHitbox(
		rockLGEntity,
		motionHitboxSettings,
	);

	return rockLGEntity;
};