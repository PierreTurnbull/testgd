import { TDirection } from "../../components/direction/types/direction.types";
import { DIRECTION_ANGLES } from "../../constants/space.constants";

/**
 * Returns the angle interval from the direction and the range.
 */
export const getAngleInterval = (
	direction: TDirection,
	range: number,
) => {
	const angle = DIRECTION_ANGLES[direction];

	const angleInterval = [angle - range / 2, angle + range / 2];

	return angleInterval;
};