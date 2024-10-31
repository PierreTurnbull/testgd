import { Entity } from "./entity.models";

class EntityManager {
	__brand = "entityManager";

	entities: Entity[] = [];

	/**
	 * Returns whether the entity is registered in the entity manager.
	 */
	getIsRegistered = (entity: Entity) => {
		const index = this.entities.indexOf(entity);

		return index > -1;
	};

	/**
	 * Removes the entity from the list of entities.
	 */
	removeEntity = (
		entity: Entity,
	) => {
		const index = this.entities.indexOf(entity);
		this.entities.splice(index, 1);
	};
}

export const entityManager = new EntityManager();