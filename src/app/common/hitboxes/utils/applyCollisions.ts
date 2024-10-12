import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { Entity } from "../../entities/entity.models";
import { TCoordinates } from "../../types/coordinates.types";
import { updateHitboxPosition } from "./updateHitboxPosition";

/**
 * Find collisions between the collider and other colliders and apply them by updating the collider's next coordinates.
 */
export const applyCollisions = (
	colliderEntity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const hitboxComponent = colliderEntity.getComponent(CHitbox);

	updateHitboxPosition(hitboxComponent.body, nextCoordinates);

	collisionsManager.checkOne(hitboxComponent.body, (response) => {
		nextCoordinates.x -= response.overlapV.x;
		nextCoordinates.y -= response.overlapV.y;
		updateHitboxPosition(hitboxComponent.body, nextCoordinates);
		response.clear();
	});

	// idea of possible optimization: if final point not in interval of from to dest, then replace it to original point
	// this will prevent bugs where the collider teleports to the wrong coordinates
};