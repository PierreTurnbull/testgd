import { AnimatedSprite } from "pixi.js";
import { CView } from "../../../components/view/view.entity";
import { TCoordinates } from "../../../types/coordinates.types";
import { setAnimatedSprite } from "./setAnimatedSprite";

/**
 * Frees the previous animated sprite and sets the new one.
 * @param viewComponent 
 * @param newAnimatedSprite 
 * @param coordinates 
 */
export const replaceAnimatedSprite = (
	viewComponent: CView,
	newAnimatedSprite: AnimatedSprite,
	coordinates: TCoordinates,
) => {
	const prevAnimatedSprite = viewComponent.animatedSprite;

	setAnimatedSprite(viewComponent, newAnimatedSprite, coordinates);

	prevAnimatedSprite.removeFromParent();
};