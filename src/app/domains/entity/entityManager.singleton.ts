import { archetypeManager } from "../../common/archetypes/archetypeManager.singleton";
import { Component } from "../../common/components/component.models";
import { CTimers } from "../../common/components/timers/timers.component";
import { CRelation } from "../relationManager/components/common/relation.component";
import { relationsManager } from "../relationManager/relationsManager.singleton";
import { Entity } from "./entity.models";
import { TEntitySettings } from "./types/entity.types";

class EntityManager {
	__brand = "entityManager";

	entities = new Set<Entity>();
	entitiesById = new Map<number, Entity>();

	/**
	 * Returns whether the entity is registered in the entity manager.
	 */
	getIsRegistered = (entity: Entity) => {
		return this.entities.has(entity);
	};

	/**
	 * Removes the entity from the list of entities.
	 */
	removeEntity = (
		entity: Entity,
	) => {
		this.entities.delete(entity);
		this.entitiesById.delete(entity.id);
		archetypeManager.removeEntityFromArchetypes(entity);
	};

	createEntity = (
		name: string,
		components: (Component | null | undefined)[],
		settings?: TEntitySettings,
	) => {
		const entity = new Entity(
			settings,
		);
		entity.name = name;
		const filteredComponents = components.filter(component => component !== null && component !== undefined);
		entity.addComponents([
			...filteredComponents,
			new CTimers(),
		]);
		this.entities.add(entity);
		this.entitiesById.set(entity.id, entity);

		// register relations
		if (entity.hasComponent(CRelation)) {
			relationsManager.relations.add(entity);
		}
	
		archetypeManager.registerEntity(entity);

		return entity;
	};
}

export const entityManager = new EntityManager();