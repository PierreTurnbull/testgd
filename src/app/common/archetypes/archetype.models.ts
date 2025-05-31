import { Entity } from "../../domains/entity/entity.models";
import { Component } from "../components/component.models";
import { ConstructorOf } from "../types/constructor.types";

export class Archetype {
	constructor(
		requiredComponents: ConstructorOf<Component>[],
	) {
		this.requiredComponents = requiredComponents;
	}

	requiredComponents: (typeof Component)[];

	entities = new Set<Entity>();
	entitiesById = new Map<Entity["id"], Entity>();

	entityMatchesArchetype(entity: Entity) {
		return Boolean(this.entitiesById.get(entity.id));
	}
}