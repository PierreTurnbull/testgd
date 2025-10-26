import { TPoint } from "../../types/point.type";

/**
 * Returns the angle from point a to point b. The angle ranges from 0 to 360.
 */
export const getAngleFromPoints = (a: TPoint, b: TPoint) => {
	const x = b.x - a.x;
	const y = b.y - a.y;

	const angle = (Math.atan2(y, x) * 180) / Math.PI;
	const positiveAngle = angle < 0 ? 360 + angle : angle;

	return positiveAngle;
};