import { Component } from "../../components/component.models";
import { Entity } from "../entity.models";
import { entityManager } from "../entityManager.singleton";

export const createEntity = (
	name: string,
	components: Component[],
) => {
	const entity = new Entity();
	entity.name = name;
	entity.addComponents(components);
	entityManager.entities.push(entity);

	return entity;
};