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
import { TEntityBuilder } from "@root/app/common/types/entityBuilder.types";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { selectEntity } from "@root/app/domains/editor/utils/selectEntity/selectEntity";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { relationsManager } from "@root/app/domains/relationManager/relationsManager.singleton";
import { getCenterView } from "@root/app/domains/view/utils/common/getCenterView/getCenterView";
import { HITBOXES_POINTS } from "../../hitbox/constants/hitboxes.constants";
import { TPolygonHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { getBorderView } from "../../view/utils/common/getBorderView/getBorderView";
import { createView } from "../../view/utils/create/createView/createView";
import { getSprite } from "../../view/utils/getSprite/getSprite";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { VIEW_SORTING_CURVES } from "../../viewSortingCurve/constants/viewSortingCurve.constants";
import { getViewSortingCurveView } from "../../viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";
import { CRockLG } from "../components/rockLG/rockLG.component";

export const createRockLG: TEntityBuilder = (
	coordinates: TCoordinates,
	variant: number,
	direction8: TDirection8,
	gameEditorId?: number,
) => {
	const viewName = `environment.rockLG.${variant}.${direction8}`;

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewName];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${viewName}".`);
	}

	const viewSortingCurve = VIEW_SORTING_CURVES[viewName];
	if (!viewSortingCurve) {
		throw new Error(`Missing view sorting curve for "${viewName}".`);
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
		new CViewSortingCurveView(null),

		// views
		new CView(null),
		new CBorderView(null),
		new CCenterView(null),
	]);

	createView(rockLGEntity, CView, getSprite, "view");

	if (configManager.config.debug.showsEntityBorders) {
		createView(rockLGEntity, CBorderView, getBorderView, "borderView");
	}

	if (configManager.config.debug.showsEntityCenters) {
		createView(rockLGEntity, CCenterView, getCenterView, "centerView");
	}

	if (configManager.config.debug.showsViewSortingCurves) {
		createView(rockLGEntity, CViewSortingCurveView, getViewSortingCurveView, "viewSortingCurveView");
	}

	if (gameEditorId !== undefined) {
		rockLGEntity.addComponent(new CGameEditorId(gameEditorId));
	}

	rockLGEntity.getComponent(CView).view.interactive = true;
	rockLGEntity.getComponent(CView).view.addEventListener("mousedown", () => {
		selectEntity(rockLGEntity);
	});

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
		rockLGEntity,
		motionHitboxSettings,
	);

	return rockLGEntity;
};