import { Entity } from "../../../domains/entity/entity.models";

/**
 * Finds the entity from which the entity passed as parameter originates.
 */
export const findOriginEntity = (entity: Entity) => {
	const hitboxParentEntity = entity.getRelatedEntity("parent");
	let parentEntity: Entity | null = null;

	if (hitboxParentEntity.name === "projectile") {
		parentEntity = hitboxParentEntity.getRelatedEntity("shooter");
	} else {
		parentEntity = hitboxParentEntity;
	}

	return parentEntity;
};