import { Component } from "../components/component.models";
import { Entity } from "../entities/entity.models";

export class Archetype {
	constructor(
		requiredComponents: (typeof Component)[],
	) {
		this.requiredComponents = requiredComponents;
	}

	requiredComponents: (typeof Component)[];
	_entities: Record<Entity["id"], Entity> = {};

	get entities() {
		return Object.values(this._entities);
	}

	addEntity(entity: Entity) {
		if (this._entities[entity.id]) {
			throw new Error(`Entity ${entity.id} already exists.`);
		}

		this._entities[entity.id] = entity;
	}

	removeEntity(id: Entity["id"]) {
		if (!this._entities[id]) {
			throw new Error(`Entity ${id} does not exist.`);
		}

		delete this._entities[id];
	}

	entityMatchesArchetype(entity: Entity) {
		const entityComponents = Object.values(entity.components);
		const entityComponentConstructors = entityComponents.map(a => a.constructor);

		for (const requiredComponent of this.requiredComponents) {
			if (!entityComponentConstructors.includes(requiredComponent)) {
				return false;
			}
		}

		return true;
	}
}