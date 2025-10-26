import { Ticker } from "pixi.js";
import { TCoordinates } from "../../types/coordinates.types";
import { TDirection } from "../../types/direction.types";
import { TOffset } from "../../types/offset.types";

/**
 * Returns new coordinates after applying a motion
 */
export const getNextCoordinates = (
	delta: Ticker,
	coordinates: TCoordinates,
	direction: TDirection,
	velocity: number,
) => {
	const totalDistance = delta.deltaTime * velocity;

	const directionRadianForX = Math.cos(direction * Math.PI / 180);
	const directionRadianForY = Math.sin(direction * Math.PI / 180);

	const distanceOnX = totalDistance * directionRadianForX;
	const distanceOnY = totalDistance * directionRadianForY;

	const nextCoordinates: TOffset = {
		x: coordinates.x + distanceOnX,
		y: coordinates.y + distanceOnY,
	};

	return nextCoordinates;
};