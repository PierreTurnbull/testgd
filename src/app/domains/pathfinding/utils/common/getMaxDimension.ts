import { TPoint } from "@root/app/common/types/point.type";
import { getDistance } from "@root/app/common/utils/geometry/getDistance/getDistance";

/**
 * Returns the biggest distance between two points of a polygon.
 */
export const getMaxDimension = (points: TPoint[]) => {
	let maxDimension = 0;

	points.forEach(pointA => {
		points.forEach(pointB => {
			const distance = getDistance(pointA, pointB);

			if (distance > maxDimension) {
				maxDimension = distance;
			}
		});
	});

	return maxDimension;
};