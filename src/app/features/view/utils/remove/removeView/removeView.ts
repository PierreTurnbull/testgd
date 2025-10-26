import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Component } from "@root/app/ecs/components/models/component.models";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { ViewContainer } from "pixi.js";

/**
 * Remove the view represented by componentClass.
 */
export const removeView = <TComponent extends Component>(
	entity: Entity,
	componentClass: ConstructorOf<TComponent>,
	key: keyof TComponent,
) => {
	const viewComponent = entity.getComponent(componentClass);

	if (!(viewComponent[key] instanceof ViewContainer)) {
		throw new Error("Invalid key.");
	}

	viewComponent[key].removeFromParent();
	;(viewComponent[key] as ViewContainer | null) = null;
};