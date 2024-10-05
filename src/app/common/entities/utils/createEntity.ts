import { Component } from "../../components/component.models";
import { Entity } from "../entity.models";
import { entityManager } from "../entityManager.singleton";

export const createEntity = (
	components: Component[],
) => {
	const entity = new Entity();
	entity.addComponents(components);
	entityManager.entities.push(entity);
};