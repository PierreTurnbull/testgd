import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { DIAGONAL_DISTANCE_FACTOR } from "@root/domains/space/constants/distances.constants";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { TDirection } from "@root/domains/space/types/direction.types";
import { Ticker } from "pixi.js";

export class MotionManager {
	/**
	 * Apply movement by updating coordinates.
	 * @param delta 
	 */
	applyMotion(
		delta: Ticker,
		locationManager: LocationManager,
		direction: TDirection,
		motionSpeed: number,
	) {
		let newCoordinates: TCoordinates;

		switch (direction) {
		case "upLeft":
			newCoordinates = {
				x: locationManager.coordinates.x - delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
				y: locationManager.coordinates.y - delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
			};
			break;
		case "downLeft":
			newCoordinates = {
				x: locationManager.coordinates.x - delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
				y: locationManager.coordinates.y + delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
			};
			break;
		case "upRight":
			newCoordinates = {
				x: locationManager.coordinates.x + delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
				y: locationManager.coordinates.y - delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
			};
			break;
		case "downRight":
			newCoordinates = {
				x: locationManager.coordinates.x + delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
				y: locationManager.coordinates.y + delta.deltaTime * motionSpeed * DIAGONAL_DISTANCE_FACTOR,
			};
			break;
		case "left":
			newCoordinates = {
				x: locationManager.coordinates.x - delta.deltaTime * motionSpeed,
				y: locationManager.coordinates.y,
			};
			break;
		case "right":
			newCoordinates = {
				x: locationManager.coordinates.x + delta.deltaTime * motionSpeed,
				y: locationManager.coordinates.y,
			};
			break;
		case "up":
			newCoordinates = {
				x: locationManager.coordinates.x,
				y: locationManager.coordinates.y - delta.deltaTime * motionSpeed,
			};
			break;
		case "down":
			newCoordinates = {
				x: locationManager.coordinates.x,
				y: locationManager.coordinates.y + delta.deltaTime * motionSpeed,
			};
			break;
		}

		locationManager.setCoordinates(newCoordinates);
	}
}