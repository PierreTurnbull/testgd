import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { HITBOX_BOUNDS } from "@root/app/common/hitboxes/constants/hitboxes.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { initHitboxBorder } from "./initHitboxBorder";

/**
 * Frees the previous hitbox border and sets the new one.
 */
export const replaceHitboxBorder = (
	hitboxViewComponent: CHitboxView,
	hitboxName: string,
	coordinates: TCoordinates,
) => {
	const prevHitboxBorder = hitboxViewComponent.hitboxBorder;

	const hitboxBounds: TPoint[] = [
		{
			x: 0,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS[hitboxName].w,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS[hitboxName].w,
			y: HITBOX_BOUNDS[hitboxName].h,
		},
		{
			x: 0,
			y: HITBOX_BOUNDS[hitboxName].h,
		},
	];
	hitboxViewComponent.hitboxBorder = initHitboxBorder(hitboxName, hitboxBounds, coordinates);

	prevHitboxBorder.removeFromParent();
};