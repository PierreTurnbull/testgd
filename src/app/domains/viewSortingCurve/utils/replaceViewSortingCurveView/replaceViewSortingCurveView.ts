import { CView } from "@root/app/common/components/view/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CViewSortingCurve } from "@root/app/domains/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { initViewSortingCurveView } from "../initViewSortingCurveView/initViewSortingCurveView";

/**
 * Frees the previous sorting curve view and sets the new one.
 */
export const replaceViewSortingCurveView = (
	entity: Entity,
	coordinates: TCoordinates,
) => {
	const viewComponent = entity.getComponent(CView);
	const viewSortingCurveComponent = entity.getComponent(CViewSortingCurve);
	const viewSortingCurveViewComponent = entity.getComponent(CViewSortingCurveView);

	if (!viewSortingCurveViewComponent.viewSortingCurveView) {
		throw new Error("Cannot replace unexisting sorting curve.");
	}

	const prevViewSortingCurveView = viewSortingCurveViewComponent.viewSortingCurveView;

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewComponent.view.label];

	viewSortingCurveViewComponent.viewSortingCurveView = initViewSortingCurveView(
		viewSortingCurveViewComponent.viewSortingCurveView.label,
		coordinates,
		viewSortingCurveComponent.viewSortingCurve,
		centerOffset,
	);

	prevViewSortingCurveView.removeFromParent();
};