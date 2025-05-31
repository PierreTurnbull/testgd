import { TSegment } from "@root/app/common/types/segment.types";
import { getPointIsOnSegment } from "../getPointIsOnSegment/getPointIsOnSegment";

const crossProduct = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
) => {
	return x1 * y2 - y1 * x2;
};

/**
 * Returns whether the two segments intersect.
 */
export const getSegmentsIntersect = (
	segmentA: TSegment,
	segmentB: TSegment,
) => {
	const [x1, y1] = [segmentA[0].x, segmentA[0].y];
	const [x2, y2] = [segmentA[1].x, segmentA[1].y];
	const [x3, y3] = [segmentB[0].x, segmentB[0].y];
	const [x4, y4] = [segmentB[1].x, segmentB[1].y];

	// Calculate direction of cross-products
	const d1 = crossProduct(x4 - x3, y4 - y3, x1 - x3, y1 - y3);
	const d2 = crossProduct(x4 - x3, y4 - y3, x2 - x3, y2 - y3);
	const d3 = crossProduct(x2 - x1, y2 - y1, x3 - x1, y3 - y1);
	const d4 = crossProduct(x2 - x1, y2 - y1, x4 - x1, y4 - y1);

	// Check if segments straddle each other
	if ((d1 * d2 < 0) && (d3 * d4 < 0)) {
		return true;
	}

	// Check if the points are collinear and on the segments
	if (d1 === 0 && getPointIsOnSegment(segmentA[0], segmentB)) return true;
	if (d2 === 0 && getPointIsOnSegment(segmentA[1], segmentB)) return true;
	if (d3 === 0 && getPointIsOnSegment(segmentB[0], segmentA)) return true;
	if (d4 === 0 && getPointIsOnSegment(segmentB[1], segmentA)) return true;

	return false;
};