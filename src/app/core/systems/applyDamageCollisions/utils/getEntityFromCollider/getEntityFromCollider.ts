import { hitboxArchetype } from "@root/app/common/archetypes/hitbox/hitbox.archetype";
import { aaa } from "@root/app/core/utils/initLoop/initLoop";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
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
		console.error(body, hitboxArchetype.entities, aaa);
		throw new Error("Collider does not belong to any entity.");
	}

	return matchingEntity;
};