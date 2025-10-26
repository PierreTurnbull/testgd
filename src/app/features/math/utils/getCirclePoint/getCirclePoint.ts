import { TCoordinates } from "../../types/coordinates.types";
import { TPoint } from "../../types/point.type";

/**
 * Returns the point of a circle corresponding to an angle from its origin.
 */
export const getCirclePoint = (
	origin: TCoordinates,
	radius: number,
	angle: number,
) => {
	const angleInRadians = angle * (Math.PI / 180);
    
	const x = Math.round(origin.x + radius * Math.cos(angleInRadians) * 1000) / 1000;
	const y = Math.round(origin.y + radius * Math.sin(angleInRadians) * 1000) / 1000;

	const point: TPoint = {
		x,
		y,
	};

	return point;
};