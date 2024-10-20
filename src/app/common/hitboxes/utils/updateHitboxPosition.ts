import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { TCoordinates } from "../../types/coordinates.types";

/**
 * Updates the hitbox position using the provided coordinates.
 * The hitbox position is the top-left corner of the hitbox, therefore the position is computed
 * with the next coordinates and half of the dimensions of the hitbox as negative offsets.
 */
export const updateHitboxPosition = (
	hitboxComponent: CHitbox,
	nextCoordinates: TCoordinates,
) => {
	const nextHitboxCoordinates: TCoordinates = {
		x: nextCoordinates.x,
		y: nextCoordinates.y,
	};
	hitboxComponent.body.setPosition(nextHitboxCoordinates.x, nextHitboxCoordinates.y);
	collisionsManager.system.updateBody(hitboxComponent.body);
};