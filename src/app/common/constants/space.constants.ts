import { TDirection } from "../components/direction/types/direction.types";

export const DIAGONAL_DISTANCE_FACTOR = Math.sqrt(1 / 2);

/**
 * The amount of angles available
 */
export const ANGLES_COUNT = 8;

/**
 * The range of angles, determined from the amount of angles available.
 */
export const ANGLES_RANGE = 360 / 8;

/**
 * The main angles, determined from the amount of angles available.
 */
export const MAIN_ANGLES = Array(ANGLES_COUNT).fill(null).map((_, key: number) => ANGLES_RANGE * key);

/**
 * The 8 available directions, ordered by angle clockwise.
 */
export const DIRECTIONS: TDirection[] = ["right", "downRight", "down", "downLeft", "left", "upLeft", "up", "upRight"];

/**
 * The opposite direction of each direction.
 */
export const OPPOSITE_DIRECTIONS: Record<TDirection, TDirection> = {
	right:     "left",
	downRight: "upLeft",
	down:      "up",
	downLeft:  "upRight",
	left:      "right",
	upLeft:    "downRight",
	up:        "down",
	upRight:   "downLeft",
};

/**
 * The 8 available directions' angles.
 */
export const DIRECTION_ANGLES = Object.fromEntries(DIRECTIONS.map((direction, key) => {
	return [
		direction,
		MAIN_ANGLES[key],
	];
}));