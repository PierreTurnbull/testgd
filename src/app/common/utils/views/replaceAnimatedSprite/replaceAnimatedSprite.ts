import { CView } from "../../../../common/components/view/view.component";
import { TCoordinates } from "../../../../common/types/coordinates.types";
import { initAnimatedSprite } from "../initAnimatedSprite/initAnimatedSprite";

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