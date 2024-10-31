import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CHitbox } from "../components/hitbox/hitbox.component";
import { TCoordinates } from "../../../common/types/coordinates.types";

/**
 * Updates the hitbox position using the provided coordinates.
 */
export const updateHitboxPosition = (
	hitboxComponent: CHitbox,
	nextCoordinates: TCoordinates,
) => {
	hitboxComponent.body.setPosition(nextCoordinates.x, nextCoordinates.y);
	collisionsManager.system.updateBody(hitboxComponent.body);
};