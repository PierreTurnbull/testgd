import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { AHitbox } from "@root/app/common/archetypes/hitbox/hitbox.archetype";
import { Entity } from "@root/app/common/entities/entity.models";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { Box, Circle, Polygon } from "detect-collisions";

/**
 * Returns the entity to which the body belongs.
 */
export const getEntityFromCollider = (body: Box | Polygon | Circle): Entity => {
	const matchingEntity = archetypeManager.getEntitiesByArchetype(AHitbox)
		.find(entity => {
			const hitboxComponent = entity.getComponent(CHitbox);

			return hitboxComponent.body === body;
		});

	if (!matchingEntity) {
		throw new Error("Collider does not belong to any entity.");
	}

	return matchingEntity;
};