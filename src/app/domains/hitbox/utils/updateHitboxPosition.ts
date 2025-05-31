import { collisionsManager } from "@root/app/domains/collisionsManager/collisionsManager.singletons";
import { TCoordinates } from "../../../common/types/coordinates.types";
import { CHitbox } from "../components/hitbox/hitbox.component";

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