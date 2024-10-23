import { CBorderView } from "@root/app/common/components/border/border.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { initBorder } from "./initBorder";
import { CView } from "@root/app/common/components/view/view.component";

/**
 * Frees the previous animated sprite border and sets the new one.
 */
export const replaceBorder = (
	viewComponent: CView,
	borderViewComponent: CBorderView,
	coordinates: TCoordinates,
) => {
	const prevBorder = borderViewComponent.border;

	borderViewComponent.border = initBorder(viewComponent.animatedSprite, coordinates);

	prevBorder.removeFromParent();
};