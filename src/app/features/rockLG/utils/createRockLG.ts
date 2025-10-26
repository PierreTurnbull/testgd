import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVariant } from "@root/app/ecs/components/common/variant.component";
import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { TEntityBuilder } from "@root/app/ecs/entities/types/entityBuilder.types";
import { configManager } from "@root/app/features/config/singletons/configManager.singleton";
import { CGameEditorId } from "@root/app/features/editor/components/gameEditorId.component";
import { selectEntity } from "@root/app/features/editor/utils/selectEntity/selectEntity";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { relationsManager } from "@root/app/features/relation/relationsManager.singleton";
import { CBorderView } from "@root/app/features/view/components/borderView.component";
import { CCenterView } from "@root/app/features/view/components/centerView.component";
import { CView } from "@root/app/features/view/components/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { getCenterView } from "@root/app/features/view/utils/common/getCenterView/getCenterView";
import { HITBOXES_POINTS } from "../../hitbox/constants/hitboxes.constants";
import { TPolygonHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { DIRECTION8_ANGLES } from "../../math/constants/space.constants";
import { TDirection8 } from "../../math/types/direction.types";
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