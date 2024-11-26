import { CView } from "../../../components/view/view.component";
import { TCoordinates } from "../../../types/coordinates.types";
import { initAnimatedSprite } from "./initAnimatedSprite";

/**
 * Frees the previous animated sprite and sets the new one.
 * @param viewComponent 
 * @param newAnimatedSpriteName
 * @param coordinates 
 */
export const replaceAnimatedSprite = (
	viewComponent: CView,
	newAnimatedSpriteName: string,
	coordinates: TCoordinates,
) => {
	const prevAnimatedSprite = viewComponent.view;

	viewComponent.view = initAnimatedSprite(newAnimatedSpriteName, coordinates);

	prevAnimatedSprite.removeFromParent();
};