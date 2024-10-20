import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { Box, Circle, Polygon, System } from "detect-collisions";

class CollisionsManager {
	/**
	 * The collision system. It contains all collider objects and computes collisions.
	 */
	system = new System();

	/**
	 * Returns the entity to which the collider belongs.
	 */
	getEntityFromCollider(collider: Box | Polygon | Circle): Entity {
		const matchingEntity = entityManager.entities
			.filter(entity => entity.hasComponent(CHitbox))
			.find(entity => {
				const hitboxComponent = entity.getComponent(CHitbox);

				return hitboxComponent.body === collider;
			});

		if (!matchingEntity) {
			throw new Error("Collider does not belong to any entity.");
		}

		return matchingEntity;
	}
}

export const collisionsManager = new CollisionsManager();