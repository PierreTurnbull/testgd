import { CView } from "@root/app/common/components/view/view.entity";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { setAnimatedSpriteBorder } from "./setAnimatedSpriteBorder";

/**
 * Frees the previous animated sprite border and sets the new one.
 * @param viewComponent 
 * @param coordinates 
 */
export const replaceAnimatedSpriteBorder = (
	viewComponent: CView,
	coordinates: TCoordinates,
) => {
	const prevAnimatedSpriteBorder = viewComponent.animatedSpriteBorder;

	setAnimatedSpriteBorder(viewComponent, coordinates);

	prevAnimatedSpriteBorder.removeFromParent();
};