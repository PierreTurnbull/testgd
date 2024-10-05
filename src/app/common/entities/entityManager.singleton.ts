import { Entity } from "./entity.models";

class EntityManager {
	__brand = "entityManager";

	entities: Entity[] = [];

	/**
	 * Gets the entity that corresponds to the specified entity class.
	 * @param entityClass 
	 * @returns entity instance
	 */
	getEntity<TEntity extends typeof Entity>(entityClass: TEntity): InstanceType<TEntity> {
		const entity = this.entities.find(entity => entity instanceof entityClass);
		const instanceMatchesClass =  ((entity: Entity | undefined): entity is InstanceType<TEntity> => entity instanceof entityClass)(entity);
		if (!instanceMatchesClass) throw new Error(`Entity ${entityClass.name} not found.`);
		return entity;
	}
}

export const entityManager = new EntityManager();