import { TDirection } from "../../types/direction.types";

/**
 * Returns the angle interval from the direction and the range.
 */
export const getAngleInterval = (
	direction: TDirection,
	range: number,
) => {
	const angleInterval = [direction - range / 2, direction + range / 2];

	return angleInterval;
};