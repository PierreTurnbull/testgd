import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { getOffsetCoordinates } from "@root/app/features/math/utils/getOffsetCoordinates/getOffsetCoordinates";
import { CView } from "@root/app/features/view/components/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
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