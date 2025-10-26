import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVariant } from "@root/app/ecs/components/common/variant.component";
import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
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
import { getSprite } from "@root/app/features/view/utils/getSprite/getSprite";
import { HITBOXES_POINTS } from "../../hitbox/constants/hitboxes.constants";
import { TPolygonHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { DIRECTION8_ANGLES } from "../../math/constants/space.constants";
import { TDirection8 } from "../../math/types/direction.types";
import { getBorderView } from "../../view/utils/common/getBorderView/getBorderView";
import { createView } from "../../view/utils/create/createView/createView";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { VIEW_SORTING_CURVES } from "../../viewSortingCurve/constants/viewSortingCurve.constants";
import { getViewSortingCurveView } from "../../viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";
import { CRockMD } from "../components/rockMD/rockMD.component";

export const createRockMD = (
	coordinates: TCoordinates,
	variant: number,
	direction8: TDirection8,
	gameEditorId?: number,
) => {
	const viewName = `environment.rockMD.${variant}.${direction8}`;

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewName];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${viewName}".`);
	}

	const viewSortingCurve = VIEW_SORTING_CURVES[viewName];
	if (!viewSortingCurve) {
		throw new Error(`Missing view sorting curve for "${viewName}".`);
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
		new CViewSortingCurveView(null),

		// views
		new CView(null),
		new CBorderView(null),
		new CCenterView(null),
	]);
	
	createView(rockMDEntity, CView, getSprite, "view");

	if (configManager.config.debug.showsEntityBorders) {
		createView(rockMDEntity, CBorderView, getBorderView, "borderView");
	}

	if (configManager.config.debug.showsEntityCenters) {
		createView(rockMDEntity, CCenterView, getCenterView, "centerView");
	}

	if (configManager.config.debug.showsViewSortingCurves) {
		createView(rockMDEntity, CViewSortingCurveView, getViewSortingCurveView, "viewSortingCurveView");
	}

	if (gameEditorId !== undefined) {
		rockMDEntity.addComponent(new CGameEditorId(gameEditorId));
	}
	
	rockMDEntity.getComponent(CView).view.interactive = true;
	rockMDEntity.getComponent(CView).view.addEventListener("mousedown", () => {
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