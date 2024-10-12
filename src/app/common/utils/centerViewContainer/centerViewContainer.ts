import { ViewContainer } from "pixi.js";

/**
 * Centers the view container on itself.
 * @param viewContainer 
 * @param coordinates 
 */
export const centerViewContainer = (
	viewContainer: ViewContainer,
) => {
	viewContainer.x = viewContainer.x - (viewContainer.width / 2);
	viewContainer.y = viewContainer.y - (viewContainer.height / 2);
};