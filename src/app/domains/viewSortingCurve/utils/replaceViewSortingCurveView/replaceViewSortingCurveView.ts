import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { initViewSortingCurveView } from "../initViewSortingCurveView/initViewSortingCurveView";
import { CViewSortingCurve } from "@root/app/domains/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveOffset } from "../../components/viewSortingCurveOffset/viewSortingCurveOffset.component";

/**
 * Frees the previous hitbox border and sets the new one.
 */
export const replaceViewSortingCurveView = (
	entity: Entity,
	coordinates: TCoordinates,
) => {
	const viewSortingCurveComponent = entity.getComponent(CViewSortingCurve);
	const viewSortingCurveViewComponent = entity.getComponent(CViewSortingCurveView);
	const viewSortingCurveOffsetComponent = entity.getComponent(CViewSortingCurveOffset);

	if (!viewSortingCurveViewComponent.viewSortingCurveView) {
		throw new Error("Cannot replace unexisting sorting curve.");
	}

	const prevViewSortingCurveView = viewSortingCurveViewComponent.viewSortingCurveView;

	viewSortingCurveViewComponent.viewSortingCurveView = initViewSortingCurveView(
		viewSortingCurveViewComponent.viewSortingCurveView.label,
		coordinates,
		viewSortingCurveComponent.viewSortingCurve,
		viewSortingCurveOffsetComponent.viewSortingCurveOffset,
	);

	prevViewSortingCurveView.removeFromParent();
};