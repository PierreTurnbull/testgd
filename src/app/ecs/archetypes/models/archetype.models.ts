import { ConstructorOf } from "../../../common/types/constructor.types";
import { Component } from "../../components/models/component.models";
import { Entity } from "../../entities/models/entity.models";

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