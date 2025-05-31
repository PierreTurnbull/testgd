import { TPoint } from "../../../types/point.type";
import { TSegment } from "../../../types/segment.types";

/**
 * Returns whether point P is on the segment AB.
 */
export const  getPointIsOnSegment = (
	P: TPoint,
	segment: TSegment,
) => {
	const [A, B] = segment;

	// Calculate the cross product to check if the point is on the line
	const crossProduct = (P.y - A.y) * (B.x - A.x) - (P.x - A.x) * (B.y - A.y);
	if (crossProduct !== 0) {
		return false; // The point is not on the line
	}

	// Check if the point is within the bounding box of the segment
	const withinXBounds = Math.min(A.x, B.x) <= P.x && P.x <= Math.max(A.x, B.x);
	const withinYBounds = Math.min(A.y, B.y) <= P.y && P.y <= Math.max(A.y, B.y);

	return withinXBounds && withinYBounds;
};