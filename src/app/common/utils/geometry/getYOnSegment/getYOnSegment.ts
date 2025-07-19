import { TSegment } from "@root/app/common/types/segment.types";

/**
 * Returns the y value of a given x on the segment.
 */
export const getYOnSegment = (
	segment: TSegment,
	x: number,
) => {
	const [p1, p2] = segment;

	if (x < Math.min(p1.x, p2.x) || x > Math.max(p1.x, p2.x)) {
		throw new Error("x is outside the segment range");
	}

	// Handle vertical line case.
	if (p1.x === p2.x) {
		return p1.y; // or p2.y, both are same in vertical line
	}

	const slope = (p2.y - p1.y) / (p2.x - p1.x);
	const y = p1.y + slope * (x - p1.x);

	return y;
};