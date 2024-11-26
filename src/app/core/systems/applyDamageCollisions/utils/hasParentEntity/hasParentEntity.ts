import { hitboxArchetype } from "@root/app/common/archetypes/hitbox/hitbox.archetype";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { Box, Circle, Polygon } from "detect-collisions";

/**
 * Returns whether the collider body is related to an entity.
 */
export const hasParentEntity = (body: Box | Polygon | Circle) => {
	const matchingEntity = [...hitboxArchetype.entities]
		.find(entity => {
			const hitboxComponent = entity.getComponent(CHitbox);

			return hitboxComponent.body === body;
		});

	return Boolean(matchingEntity);
};