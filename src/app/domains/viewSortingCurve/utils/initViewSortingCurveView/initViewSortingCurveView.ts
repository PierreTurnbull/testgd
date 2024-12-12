import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TOffset } from "@root/app/common/types/offset.types";
import { TPoint } from "@root/app/common/types/point.type";
import { getOffsetCoordinates } from "@root/app/common/utils/getOffsetCoordinates/getOffsetCoordinates";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";

/**
 * Initializes a sorting curve.
 */
export const initViewSortingCurveView = (
	label: string,
	coordinates: TCoordinates,
	bounds: TPoint[],
	offset: TOffset,
) => {
	const viewSortingCurveView = new Graphics();

	viewSortingCurveView.moveTo(bounds[0].x, bounds[0].y);
	bounds.slice(1).forEach(point => {
		viewSortingCurveView.lineTo(point.x, point.y);
	});

	const color = 0x3366ff;

	viewSortingCurveView
		.stroke({
			width:     2,
			color:     color,
			alignment: 0.5,
		});

	viewSortingCurveView.label = label;

	const offsetCoordinates = getOffsetCoordinates(coordinates, offset);
	
	viewSortingCurveView.x = offsetCoordinates.x;
	viewSortingCurveView.y = offsetCoordinates.y;

	worldManager.world.addChild(viewSortingCurveView);

	return viewSortingCurveView;
};