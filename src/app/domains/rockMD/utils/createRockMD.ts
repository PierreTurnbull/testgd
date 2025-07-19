import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { CGameEditorId } from "@root/app/common/components/gameEditorId/gameEditorId.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { CView } from "@root/app/common/components/view/view.component";
import { DIRECTION8_ANGLES } from "@root/app/common/constants/space.constants";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { initBorderView } from "@root/app/common/utils/views/initBorderView/initBorderView";
import { initCenterView } from "@root/app/common/utils/views/initCenterView/initCenterView";
import { initSprite } from "@root/app/common/utils/views/initSprite/initSprite";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { selectEntity } from "@root/app/domains/editor/utils/selectEntity/selectEntity";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { relationsManager } from "@root/app/domains/relationManager/relationsManager.singleton";
import { Graphics } from "pixi.js";
import { HITBOXES_POINTS } from "../../hitbox/constants/hitboxes.constants";
import { TPolygonHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { VIEW_SORTING_CURVES } from "../../viewSortingCurve/constants/viewSortingCurve.constants";
import { initViewSortingCurveView } from "../../viewSortingCurve/utils/initViewSortingCurveView/initViewSortingCurveView";
import { CRockMD } from "../components/rockMD/rockMD.component";

export const createRockMD = (
	coordinates: TCoordinates,
	variant: number,
	direction8: TDirection8,
	gameEditorId?: number,
) => {
	const viewName = `environment.rockMD.${variant}.${direction8}`;

	const sprite = initSprite(viewName, coordinates);

	let borderView: Graphics | null = null;
	let centerView: Graphics | null = null;
	let viewSortingCurveView: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		borderView = initBorderView(sprite, coordinates);
	}

	if (configManager.config.debug.showsEntityCenters) {
		centerView = initCenterView(viewName, coordinates);
	}
	
	const centerOffset = ENTITIES_CENTER_OFFSETS[viewName];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${viewName}".`);
	}

	const viewSortingCurve = VIEW_SORTING_CURVES[viewName];
	if (!viewSortingCurve) {
		throw new Error(`Missing view sorting curve for "${viewName}".`);
	}

	if (configManager.config.debug.showsViewSortingCurves) {
		viewSortingCurveView = initViewSortingCurveView(
			"characters.player",
			coordinates,
			viewSortingCurve,
			centerOffset,
		);
	}

	const rockMDEntity = entityManager.createEntity("rockMD", [
		// identity
		new CRockMD(),

		// misc
		new CLocation(coordinates),
		new CDirection(DIRECTION8_ANGLES[direction8]),
		new CVariant(variant),

		// view sorting curve
		new CViewSortingCurve(viewSortingCurve),
		new CViewSortingCurveView(viewSortingCurveView),

		// views
		new CView(sprite),
		new CBorderView(borderView),
		new CCenterView(centerView),
	]);

	if (gameEditorId !== undefined) {
		rockMDEntity.addComponent(new CGameEditorId(gameEditorId));
	}
	
	sprite.interactive = true;
	sprite.addEventListener("mousedown", () => {
		selectEntity(rockMDEntity);
	});

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: rockMDEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const motionHitboxSettings: TPolygonHitboxSettings = {
		shape:              "polygon",
		name:               viewName,
		type:               "motion",
		isActive:           true,
		initialCoordinates: coordinates,
		offset:             {
			x: centerOffset.x,
			y: centerOffset.y,
		},
		points: HITBOXES_POINTS[viewName],
	};

	// motion hitbox
	createHitbox(
		rockMDEntity,
		motionHitboxSettings,
	);

	return rockMDEntity;
};