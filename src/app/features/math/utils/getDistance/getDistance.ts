import { TPoint } from "../../types/point.type";

/**
 * Calculates the Euclidean distance between two points.
 */
export const getDistance = (p1: TPoint, p2: TPoint): number => {
	return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};