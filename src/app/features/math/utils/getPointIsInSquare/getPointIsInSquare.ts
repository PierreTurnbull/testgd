import { TPoint } from "../../types/point.type";
import { TSquareBounds } from "../../types/squareBounds.types";

/**
 * Returns whether the point is inside the square, using min and max bounds.
 */
export const getPointIsInSquare = (
	point: TPoint,
	squareBounds: TSquareBounds,
) => {
	return (
		point.x >= squareBounds.minX &&
		point.x <= squareBounds.maxX &&
		point.y >= squareBounds.minY &&
		point.y <= squareBounds.maxY
	);
};