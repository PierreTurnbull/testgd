import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { initCenter } from "./initCenter";

/**
 * Frees the previous hitbox border and sets the new one.
 */
export const replaceCenterView = (
	centerViewComponent: CCenterView,
	name: string,
	coordinates: TCoordinates,
) => {
	const prevCenterView = centerViewComponent.center;

	centerViewComponent.center = initCenter(name, coordinates);

	prevCenterView?.removeFromParent();
};