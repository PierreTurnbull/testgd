import { TCoordinates } from "../../types/coordinates.types";
import { TOffset } from "../../types/offset.types";

/**
 * Applies an offset to coordinates and returns the result.
 */
export const getOffsetCoordinates = (
	coordinates: TCoordinates,
	offset: TOffset,
) => {
	const offsetCoordinates = {
		x: coordinates.x + offset.x,
		y: coordinates.y + offset.y,
	};

	return offsetCoordinates;
};