import { TPoint } from "@root/app/features/math/types/point.type";
import { TSegment } from "@root/app/features/math/types/segment.types";
import { getYOnSegment } from "@root/app/features/math/utils/getYOnSegment/getYOnSegment";

/**
 * Add a point to the list of points if the list has no point on x while the other list has
 * one.
 * E.g.:
 * ```
 * 1-a-2---3
 *   4---5-b-6
 * ```
 * A matching point for `2` and `5` is added on the opposite list respectively:
 * ```
 * 1-a-2-d-3
 *   4-c-5-b-6
 * ```
 * This way, every point of both curves in the x interval has a matching point on x on the
 * opposite curve.
 */
export const addMatchingPoints = (
	aPoints: TPoint[],
	bPoints: TPoint[],
) => {
	let aCursor = 0;
	let bCursor = 0;
	let i = 0;

	while (aCursor < aPoints.length - 1 || bCursor < bPoints.length - 1) {
		i++;
		const aPoint = aPoints[aCursor];
		const bPoint = bPoints[bCursor];
		const nextAPoint = aPoints[aCursor + 1];
		const nextBPoint = bPoints[bCursor + 1];
		if (i > 10) {
			throw new Error();
		}

		const bothHaveSameX = nextAPoint.x === nextBPoint.x;
		if (bothHaveSameX) {
			aCursor++;
			bCursor++;
			continue;
		}

		const x = Math.min(nextAPoint.x, nextBPoint.x);

		if (nextAPoint.x < nextBPoint.x) {
			const bSegment: TSegment = [bPoint, nextBPoint];
			const newBPoint = {
				x: x,
				y: getYOnSegment(bSegment, x),
			};

			bPoints.splice(bCursor + 1, 0, newBPoint);
		} else {
			const aSegment: TSegment = [aPoint, nextAPoint];
			const newAPoint = {
				x: x,
				y: getYOnSegment(aSegment, x),
			};

			aPoints.splice(aCursor + 1, 0, newAPoint);
		}
		bCursor++;
		aCursor++;
	}
};