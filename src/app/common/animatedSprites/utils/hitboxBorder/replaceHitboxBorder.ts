import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { setHitboxBorder } from "./setHitboxBorder";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";

/**
 * Frees the previous hitbox border and sets the new one.
 */
export const replaceHitboxBorder = (
	hitboxComponent: CHitbox,
	hitboxViewComponent: CHitboxView,
	hitboxName: string,
	coordinates: TCoordinates,
) => {
	const prevHitboxBorder = hitboxViewComponent.hitboxBorder;

	setHitboxBorder(hitboxViewComponent, hitboxName, hitboxComponent.dimensions, coordinates);

	prevHitboxBorder.removeFromParent();
};