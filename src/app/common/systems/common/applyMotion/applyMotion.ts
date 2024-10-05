import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { CLocation } from "@root/app/common/components/location/location.component";
import { DIAGONAL_DISTANCE_FACTOR } from "@root/app/common/constants/main.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { Ticker } from "pixi.js";
import { updateAnimatedSpritePosition } from "../updateAnimatedSpritePosition/updateAnimatedSpritePosition";
import { CView } from "@root/app/common/components/view/view.entity";

/**
 * Apply motion by updating coordinates.
 * @param delta 
 */
export const applyMotion = (
	delta: Ticker,
	viewComponent: CView,
	locationComponent: CLocation,
	direction: TDirection,
	velocity: number,
) => {
	let newCoordinates: TCoordinates;

	switch (direction) {
	case "upLeft":
		newCoordinates = {
			x: locationComponent.coordinates.x - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: locationComponent.coordinates.y - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "downLeft":
		newCoordinates = {
			x: locationComponent.coordinates.x - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: locationComponent.coordinates.y + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "upRight":
		newCoordinates = {
			x: locationComponent.coordinates.x + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: locationComponent.coordinates.y - delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "downRight":
		newCoordinates = {
			x: locationComponent.coordinates.x + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
			y: locationComponent.coordinates.y + delta.deltaTime * velocity * DIAGONAL_DISTANCE_FACTOR,
		};
		break;
	case "left":
		newCoordinates = {
			x: locationComponent.coordinates.x - delta.deltaTime * velocity,
			y: locationComponent.coordinates.y,
		};
		break;
	case "right":
		newCoordinates = {
			x: locationComponent.coordinates.x + delta.deltaTime * velocity,
			y: locationComponent.coordinates.y,
		};
		break;
	case "up":
		newCoordinates = {
			x: locationComponent.coordinates.x,
			y: locationComponent.coordinates.y - delta.deltaTime * velocity,
		};
		break;
	case "down":
		newCoordinates = {
			x: locationComponent.coordinates.x,
			y: locationComponent.coordinates.y + delta.deltaTime * velocity,
		};
		break;
	}

	locationComponent.coordinates = newCoordinates;
	updateAnimatedSpritePosition(viewComponent.animatedSprite, newCoordinates);
};