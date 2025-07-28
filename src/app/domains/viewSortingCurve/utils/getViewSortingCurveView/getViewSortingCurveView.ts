import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { getOffsetCoordinates } from "@root/app/common/utils/geometry/getOffsetCoordinates/getOffsetCoordinates";
import { Entity } from "@root/app/domains/entity/entity.models";
import { Graphics } from "pixi.js";
import { CViewSortingCurve } from "../../components/viewSortingCurve/viewSortingCurve.component";

/**
 * Initializes a sorting curve.
 */
export const getViewSortingCurveView = (
	entity: Entity,
) => {
	const viewLabel = entity.getComponent(CView).view.label;
	const viewSortingCurve = entity.getComponent(CViewSortingCurve).viewSortingCurve;
	const coordinates = entity.getComponent(CLocation).coordinates;

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewLabel];

	const viewSortingCurveView = new Graphics();

	viewSortingCurveView.moveTo(viewSortingCurve[0].x, viewSortingCurve[0].y);
	viewSortingCurve.slice(1).forEach(point => {
		viewSortingCurveView.lineTo(point.x, point.y);
	});

	const color = 0x3366ff;

	viewSortingCurveView
		.stroke({
			width:     2,
			color:     color,
			alignment: 0.5,
		});

	const label = `${viewLabel.split(".").slice(0, 2).join(".")}.sortingCurve`;

	viewSortingCurveView.label = label;

	const offsetCoordinates = getOffsetCoordinates(coordinates, centerOffset);

	viewSortingCurveView.x = offsetCoordinates.x;
	viewSortingCurveView.y = offsetCoordinates.y;

	return viewSortingCurveView;
};