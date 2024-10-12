import { CView } from "@root/app/common/components/view/view.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { setBorder } from "./setBorder";

/**
 * Frees the previous animated sprite border and sets the new one.
 * @param viewComponent 
 * @param coordinates 
 */
export const replaceBorder = (
	viewComponent: CView,
	coordinates: TCoordinates,
) => {
	const prevBorder = viewComponent.border;

	setBorder(viewComponent, coordinates);

	prevBorder.removeFromParent();
};