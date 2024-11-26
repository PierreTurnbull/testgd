import { TPoint } from "@root/app/common/types/point.type";

/**
 * Returns a key that represents a point.
 */
export const getPointKey = (
	point: TPoint,
) => {
	return `${point.x},${point.y}`;
};