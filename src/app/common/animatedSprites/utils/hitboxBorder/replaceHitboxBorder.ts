import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { setHitboxBorder } from "./setHitboxBorder";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { TDimensions } from "@root/app/common/types/dimensions.types";

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

	const hitboxDimensions: TDimensions = {
		w: hitboxComponent.body.width,
		h: hitboxComponent.body.height,
	};
	setHitboxBorder(hitboxViewComponent, hitboxName, hitboxDimensions, coordinates);

	prevHitboxBorder.removeFromParent();
};