import { Component } from "../../components/component.models";
import { CTimers } from "../../components/timers/timers.component";
import { Entity } from "../entity.models";
import { entityManager } from "../entityManager.singleton";

export const createEntity = (
	name: string,
	components: (Component | null | undefined)[],
) => {
	const entity = new Entity();
	entity.name = name;
	const filteredComponents = components.filter(component => component !== null && component !== undefined);
	entity.addComponents([
		...filteredComponents,
		new CTimers(),
	]);
	entityManager.entities.push(entity);

	return entity;
};