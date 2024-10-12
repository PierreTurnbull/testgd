import { Ticker } from "pixi.js";
import { TDirection } from "../../components/direction/types/direction.types";
import { DIAGONAL_DISTANCE_FACTOR } from "../../constants/main.constants";
import { TCoordinates } from "../../types/coordinates.types";

/**
 * Returns new coordinates after applying a motion
 * @param delta 
 * @param locationComponent 
 * @param direction 
 * @param velocity 
 * @returns 
 */
export const getNextCoordinates = (
	delta: Ticker,
	coordinates: TCoordinates,
	direction: TDirection,
	velocity: number,
) => {
	let newCoordinates: TCoordinates;

	switch (direction) {
	case "upLeft":
		newCoordinates = {
			x: coordinates.x - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: coordinates.y - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "downLeft":
		newCoordinates = {
			x: coordinates.x - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: coordinates.y + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "upRight":
		newCoordinates = {
			x: coordinates.x + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: coordinates.y - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "downRight":
		newCoordinates = {
			x: coordinates.x + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: coordinates.y + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "left":
		newCoordinates = {
			x: coordinates.x - delta.deltaTime * velocity,
			y: coordinates.y,
		};
		break;
	case "right":
		newCoordinates = {
			x: coordinates.x + delta.deltaTime * velocity,
			y: coordinates.y,
		};
		break;
	case "up":
		newCoordinates = {
			x: coordinates.x,
			y: coordinates.y - delta.deltaTime * velocity,
		};
		break;
	case "down":
		newCoordinates = {
			x: coordinates.x,
			y: coordinates.y + delta.deltaTime * velocity,
		};
		break;
	}

	return newCoordinates;
};