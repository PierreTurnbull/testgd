import { TCoordinates } from "../../types/coordinates.types";
import { TOffsets } from "../../types/offsets.types";

/**
 * Applies an offset to coordinates and returns the result.
 */
export const getOffsetCoordinates = (
	coordinates: TCoordinates,
	offset: TOffsets,
) => {
	const offsetCoordinates = {
		x: coordinates.x + offset.x,
		y: coordinates.y + offset.y,
	};

	return offsetCoordinates;
};