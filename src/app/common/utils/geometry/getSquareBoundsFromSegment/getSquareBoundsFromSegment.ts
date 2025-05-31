import { TSegment } from "../../../types/segment.types";
import { TSquareBounds } from "../../../types/squareBounds.types";

/**
 * Returns square bounds from a segment.
 * The square bounds are determined based on the segment points.
 * The square has the minimum area possible while fully containing the segment.
 * This conversion is used for performance optimizations in which calculations based on rough square areas
 * are enough to prevent making more complex calculations.
 */
export const getSquareBoundsFromSegment = (
	segment: TSegment,
) => {
	const squareBounds: TSquareBounds = {
		minX: Math.min(segment[0].x, segment[1].x),
		maxX: Math.max(segment[0].x, segment[1].x),
		minY: Math.min(segment[0].y, segment[1].y),
		maxY: Math.max(segment[0].y, segment[1].y),
	};

	return squareBounds;
};