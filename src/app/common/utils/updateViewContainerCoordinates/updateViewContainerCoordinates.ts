import { ViewContainer } from "pixi.js";
import { TCoordinates } from "../../types/coordinates.types";

/**
 * Updates the view container coordinates based on new coordinates.
 */
export const updateViewContainerCoordinates = (
	viewContainer: ViewContainer,
	coordinates: TCoordinates,
) => {
	viewContainer.x = coordinates.x;
	viewContainer.y = coordinates.y;
};