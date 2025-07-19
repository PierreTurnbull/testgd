import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";

/**
 * Returns the intersection between segment1 and segment2.
 */
export const getSegmentsIntersection = (
	segment1: TSegment,
	segment2: TSegment,
) => {
	const [p1, p2] = segment1;
	const [p3, p4] = segment2;

	const det = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);

	if (det === 0) {
		// Segments are parallel.
		return null;
	}

	const lambda = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det;
	const gamma = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det;

	if (lambda >= 0 && lambda <= 1 && gamma >= 0 && gamma <= 1) {
		const intersection: TPoint = {
			x: p1.x + lambda * (p2.x - p1.x),
			y: p1.y + lambda * (p2.y - p1.y),
		};

		return intersection;
	}

	// No intersection within the segments.
	return null;
};