import { Component } from "@root/app/common/components/component.models";
import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { ViewContainer } from "pixi.js";

/**
 * Remove the view group represented by componentClass.
 */
export const removeViewGroup = <TComponent extends Component>(
	entity: Entity,
	componentClass: ConstructorOf<TComponent>,
	key: keyof TComponent,
) => {
	const viewComponent = entity.getComponent(componentClass);

	;(viewComponent[key] as ViewContainer[] | null)?.forEach(view => {
		if (!(view instanceof ViewContainer)) {
			throw new Error("Invalid key.");
		}

		view.removeFromParent();
	})

	;(viewComponent[key] as ViewContainer[] | null) = null;
};