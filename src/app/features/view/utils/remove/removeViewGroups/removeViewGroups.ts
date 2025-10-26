import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Component } from "@root/app/ecs/components/models/component.models";
import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { removeViewGroup } from "../removeViewGroup/removeViewGroup";

/**
 * Remove the view group represented by componentClass for each entity that supports it.
 */
export const removeViewGroups = <TComponent extends Component>(
	componentClass: ConstructorOf<TComponent>,
	key: keyof TComponent,
) => {
	entityManager.entities.forEach(entity => {
		if (entity.hasComponent(componentClass)) {
			removeViewGroup(entity, componentClass, key);
		}
	});
};