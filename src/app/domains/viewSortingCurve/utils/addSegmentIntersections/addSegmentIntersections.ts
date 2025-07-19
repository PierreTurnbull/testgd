import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";
import { getSegmentsIntersection } from "@root/app/common/utils/geometry/getSegmentsIntersection/getSegmentsIntersection";

/**
 * Add segment intersections to the list of points (excluding extremities).
 * This will make the comparison easier between segments.
 * E.g. with 2 intersecting curves, points being represented by numbers:
 * ```
 * 1   2
 *  \ /
 *   x
 *  / \
 * 3   4
 * ```
 * The intersection x will be added to create segments `1-x`, `x-2`, `3-x`, `x-4`.
 */
export const addSegmentIntersections = (
	aPoints: TPoint[],
	bPoints: TPoint[],
) => {
	let cursor = 1;

	while (cursor < aPoints.length) {
		const aPoint = aPoints[cursor];
		const bPoint = bPoints[cursor];
		const prevAPoint = aPoints[cursor - 1];
		const prevBPoint = bPoints[cursor - 1];
		const aSegment: TSegment = [prevAPoint, aPoint];
		const bSegment: TSegment = [prevBPoint, bPoint];

		const intersection = getSegmentsIntersection(aSegment, bSegment);

		if (intersection) {
			const intersectionIsExtremityOfASegment = (
				(intersection.x === aSegment[0].x && intersection.y === aSegment[0].y) ||
				(intersection.x === aSegment[1].x && intersection.y === aSegment[1].y)
			);

			if (!intersectionIsExtremityOfASegment) {
				aPoints.splice(cursor, 0, intersection);
				bPoints.splice(cursor, 0, intersection);

				// Increment cursor to overtake the new points.
				cursor++;
			}
		}

		cursor++;
	}
};