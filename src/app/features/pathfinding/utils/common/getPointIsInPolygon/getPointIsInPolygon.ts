import { TPoint } from "@root/app/features/math/types/point.type";
import { TSegment } from "@root/app/features/math/types/segment.types";
import { getAngleFromPoints } from "@root/app/features/math/utils/getAngleFromPoints/getAngleFromPoints";
import { getPointIsOnSegment } from "@root/app/features/math/utils/getPointIsOnSegment/getPointIsOnSegment";
import { getSegmentsIntersect } from "@root/app/features/math/utils/getSegmentsIntersect/getSegmentsIntersect";

/**
 * Returns whether the point is inside the polygon, using ray casting.
 */
export const getPointIsInPolygon = (
	point: TPoint,
	polygon: TPoint[],
) => {
	let isInside = false;

	for (let i = 0; i < polygon.length; i++) {
		const currentPoint = polygon[i];
		const prevPoint = polygon[i - 1] || polygon[polygon.length - 1];
		const nextPoint = polygon[i + 1] || polygon[0];

		const rayCastingPoint: TPoint = {
			x: 999999,
			y: point.y,
		};
		const rayCastingSegment: TSegment = [
			point,
			rayCastingPoint,
		];

		// early exit if the edge is strictly above or below the ray

		const currentPointDiff = currentPoint.y - rayCastingPoint.y;
		const nextPointDiff = nextPoint.y - rayCastingPoint.y;

		if (
			(currentPointDiff > 0 && nextPointDiff > 0) ||
			(currentPointDiff < 0 && nextPointDiff < 0)
		) {
			continue;
		}

		// check if the point is on an adge

		const pointIsOnSegment = getPointIsOnSegment(point, [currentPoint, nextPoint]);

		if (pointIsOnSegment) {
			return true;
		}

		// check if the ray crosses an extremity of the edge

		if (getPointIsOnSegment(currentPoint, rayCastingSegment)) {
			const prevPointIsAbove = prevPoint.y < rayCastingPoint.y;
			const nextPointIsAbove = nextPoint.y < rayCastingPoint.y;

			const pointCrossesVertexFromInsideOfPolygon = prevPointIsAbove !== nextPointIsAbove;

			if (pointCrossesVertexFromInsideOfPolygon) {
				isInside = !isInside;
			}
		}

		// check if the ray crosses the edge

		const segment: TSegment = [
			currentPoint,
			nextPoint,
		];

		const intersects = getSegmentsIntersect(segment, rayCastingSegment);
		// modulo 180 to make it work in both directions
		const isCollinear = getAngleFromPoints(segment[0], segment[1]) % 180 === getAngleFromPoints(rayCastingSegment[0], rayCastingSegment[1]) % 180;

		// if collinear, then the ray casting already crosses the 2 segments that are siblings of the current segment
		if (intersects && !isCollinear) {
			isInside = !isInside;
		}
	}

	return isInside;
};