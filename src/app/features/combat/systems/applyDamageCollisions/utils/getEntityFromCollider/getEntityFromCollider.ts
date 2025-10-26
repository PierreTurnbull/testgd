import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { hitboxArchetype } from "@root/app/features/hitbox/archetypes/hitbox.archetype";
import { CHitbox } from "@root/app/features/hitbox/components/hitbox/hitbox.component";
import { Box, Circle, Polygon } from "detect-collisions";

/**
 * Returns the entity to which the body belongs.
 */
export const getEntityFromCollider = (body: Box | Polygon | Circle): Entity => {
	const matchingEntity = [...hitboxArchetype.entities]
		.find(entity => {
			const hitboxComponent = entity.getComponent(CHitbox);

			return hitboxComponent.body === body;
		});

	if (!matchingEntity) {
		throw new Error("Collider does not belong to any entity.");
	}

	return matchingEntity;
};