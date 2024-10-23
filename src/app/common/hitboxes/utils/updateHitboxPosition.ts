import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { TCoordinates } from "../../types/coordinates.types";

/**
 * Updates the hitbox position using the provided coordinates.
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