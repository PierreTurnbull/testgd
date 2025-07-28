import { Component } from "@root/app/common/components/component.models";
import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { removeView } from "../removeView/removeView";

/**
 * Remove the view represented by componentClass for each entity that supports it.
 */
export const removeViews = <TComponent extends Component>(
	componentClass: ConstructorOf<TComponent>,
	key: keyof TComponent,
) => {
	entityManager.entities.forEach(entity => {
		if (entity.hasComponent(componentClass)) {
			removeView(entity, componentClass, key);
		}
	});
};