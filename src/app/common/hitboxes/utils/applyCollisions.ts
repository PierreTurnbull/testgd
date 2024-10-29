import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { ENTITIES_CENTER_OFFSETS } from "../../views/constants/views.constants";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { Entity } from "../../entities/entity.models";
import { TCoordinates } from "../../types/coordinates.types";
import { getOffsetCoordinates } from "../../utils/getOffsetCoordinates/getOffsetCoordinates";
import { updateHitboxPosition } from "./updateHitboxPosition";

/**
 * Find collisions between the collider and other colliders and apply them by updating the collider's next coordinates.
 */
export const applyCollisions = (
	colliderEntity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const hitboxComponent = colliderEntity.getComponent(CHitbox);

	const centerOffsets = ENTITIES_CENTER_OFFSETS[hitboxComponent.name];
	const centeredCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);

	updateHitboxPosition(hitboxComponent, centeredCoordinates);

	collisionsManager.system.checkOne(hitboxComponent.body, (response) => {
		if (response.a.isTrigger || response.b.isTrigger) {
			return;
		}

		// constrain next coordinates
		nextCoordinates.x -= response.overlapV.x;
		nextCoordinates.y -= response.overlapV.y;

		// constrain hitbox coordinates
		hitboxComponent.body.x -= response.overlapV.x;
		hitboxComponent.body.y -= response.overlapV.y;
		response.clear();
	});

	// idea of possible optimization: if final point not in interval of from to dest, then replace it to original point
	// this will prevent bugs where the collider teleports to the wrong coordinates
};