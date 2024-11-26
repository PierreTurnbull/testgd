import { DIAGONAL_DISTANCE_FACTOR } from "@root/app/common/constants/space.constants";
import { TPoint } from "@root/app/common/types/point.type";

/**
 * Returns a vector rotated by the specified angle.
 */
const rotateVector = (
	x: number,
	y: number,
	angle: number,
) => {
	const radians = angle * Math.PI / 180;

	const cosAngle = Math.cos(radians);
	const sinAngle = Math.sin(radians);

	// Rotation matrix application
	const rotatedX = x * cosAngle - y * sinAngle;
	const rotatedY = x * sinAngle + y * cosAngle;

	return { rotatedX, rotatedY };
};

/**
 * Returns the point C, such as BC has a length of distanceBC, and ABC forms an angle of the specified angle.
 */
export const extendAndRotate = (
	A: TPoint,
	B: TPoint,
	distanceBC: number,
	angle: number,
) => {
	// Vector AB
	const vectorABx = B.x - A.x;
	const vectorABy = B.y - A.y;

	// Rotate the vector AB by the specified angle
	const { rotatedX, rotatedY } = rotateVector(vectorABx, vectorABy, angle);

	// Normalize the rotated vector to the desired distance
	const length = Math.sqrt(rotatedX ** 2 + rotatedY ** 2);
	const scale = distanceBC / length;

	// Scale the rotated vector to the provided distance
	const scaledX = rotatedX * scale;
	const scaledY = rotatedY * scale;

	// Point C coordinates are point B + scaled vector
	return {
		x: B.x + scaledX / DIAGONAL_DISTANCE_FACTOR,
		y: B.y + scaledY / DIAGONAL_DISTANCE_FACTOR,
	};
};
