import { TDirection8 } from "../components/direction/types/direction.types";

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
export const DIRECTIONS8: TDirection8[] = ["right", "downRight", "down", "downLeft", "left", "upLeft", "up", "upRight"];

/**
 * The 8 main directions' angles.
 */
export const DIRECTION8_ANGLES = Object.fromEntries(DIRECTIONS8.map((direction, key) => {
	return [
		direction,
		MAIN_ANGLES[key],
	];
})) as Record<TDirection8, number>;

/**
 * Closest direction8 name for each possible angle.
 */
export const ANGLE_NAMES = new Map<number, TDirection8>();

for (let angle = 0; angle < 360; angle++) {
	const absI = Math.abs(angle);
	const midOffset = absI + ANGLES_RANGE / 2;
	// the range of angles that correspond to a direction surrounds the provided angle.
	// it ranges from angle minus half the range to angle plus half the range.
	const range = [midOffset, midOffset % ANGLES_RANGE];
	// the angle from the list of main angles that is the closest to our angle
	const closestAngle = range[0] - range[1];
	// the closest angle's key. the modulo ensures a continuity between the end and the beginning
	// of the list and prevents accessing an out of bound direction.
	const key = (closestAngle / ANGLES_RANGE) % 8;
	const name = DIRECTIONS8[key];
	ANGLE_NAMES.set(angle, name);
}