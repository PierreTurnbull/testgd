import { Component } from "../components/component.models";
import { Entity } from "../entities/entity.models";
import { entityManager } from "../entities/entityManager.singleton";
import { ConstructorOf } from "../types/constructor.types";

export class Archetype {
	constructor(
		requiredComponents: ConstructorOf<Component>[],
	) {
		this._requiredComponents = requiredComponents;
	}

	private _requiredComponents: (typeof Component)[];

	/**
	 * Returns the entities that match the archetype.
	 */
	get entities() {
		const entities = entityManager.entities.filter((entity) => this.entityMatchesArchetype(entity));

		return entities;
	}

	entityMatchesArchetype(entity: Entity) {
		const entityComponents = Object.values(entity.components);
		const entityComponentConstructors = entityComponents.map(a => a.constructor);

		for (const requiredComponent of this._requiredComponents) {
			if (!entityComponentConstructors.includes(requiredComponent)) {
				return false;
			}
		}

		return true;
	}
}