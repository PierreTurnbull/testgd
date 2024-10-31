import { Component } from "../../components/component.models";
import { CTimers } from "../../components/timers/timers.component";
import { Entity } from "../entity.models";
import { entityManager } from "../entityManager.singleton";
import { TEntitySettings } from "../types/entity.types";

export const createEntity = (
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
	entityManager.entities.push(entity);

	return entity;
};