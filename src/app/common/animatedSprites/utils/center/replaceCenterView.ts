import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { setCenterView } from "./setCenterView";

/**
 * Frees the previous hitbox border and sets the new one.
 */
export const replaceCenterView = (
	hitboxViewComponent: CCenterView,
	hitboxName: string,
	coordinates: TCoordinates,
) => {
	const prevCenterView = hitboxViewComponent.centerView;

	setCenterView(hitboxViewComponent, hitboxName, coordinates);

	prevCenterView?.removeFromParent();
};