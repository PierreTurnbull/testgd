import { Component } from "@root/app/common/components/component.models";
import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { ViewContainer } from "pixi.js";
import { createView } from "../createView/createView";

/**
 * Create a view represented by componentClass for each entity that supports it.
 */
export const createViews = <TComponent extends Component>(
	componentClass: ConstructorOf<TComponent>,
	getView: (entity: Entity) => ViewContainer,
	key: keyof TComponent,
) => {
	entityManager.entities.forEach(entity => {
		if (entity.hasComponent(componentClass)) {
			createView(entity, componentClass, getView, key);
		}
	});
};