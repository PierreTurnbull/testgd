import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { AHitbox } from "@root/app/common/archetypes/hitbox/hitbox.archetype";
import { Entity } from "@root/app/common/entities/entity.models";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { Box, Circle, Polygon, System } from "detect-collisions";

class CollisionsManager {
	/**
	 * The collision system. It contains all collider objects and computes collisions.
	 */
	system = new System();

	/**
	 * Returns the entity to which the collider body belongs.
	 */
	getEntityFromCollider(body: Box | Polygon | Circle): Entity {
		const matchingEntity = archetypeManager.getEntitiesByArchetype(AHitbox)
			.find(entity => {
				const hitboxComponent = entity.getComponent(CHitbox);

				return hitboxComponent.body === body;
			});

		if (!matchingEntity) {
			throw new Error("Collider does not belong to any entity.");
		}

		return matchingEntity;
	}

	/**
	 * Returns whether the collider body is related to an entity.
	 */
	hasParentEntity(body: Box | Polygon | Circle) {
		const matchingEntity = archetypeManager.getEntitiesByArchetype(AHitbox)
			.find(entity => {
				const hitboxComponent = entity.getComponent(CHitbox);

				return hitboxComponent.body === body;
			});

		return Boolean(matchingEntity);
	}
}

export const collisionsManager = new CollisionsManager();