import { TSegment } from "@root/app/common/types/segment.types";
import { TViewSortingCurve } from "@root/app/domains/viewSortingCurve/types/viewSortingCurve.types";

/**
 * Returns all the segments of the curve b, with leading and trailing horizontal segments that act
 * as default frontiers for out of bounds points.
 */
export const getAllSegmentsFromCurve = (
	curve: TViewSortingCurve,
) => {
	const curveSegments: TSegment[] = curve
		.slice(0, -1)
		.map((point, key) => [point, curve[key + 1]]);
	curveSegments.unshift([{ x: -999999, y: curveSegments[0][0].y }, curveSegments[0][0]]);
	curveSegments.unshift([{ x: 999999, y: curveSegments[curveSegments.length - 1][1].y }, curveSegments[curveSegments.length - 1][1]]);

	return curveSegments;
};