import { Component } from "@root/app/common/components/component.models";
import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Entity } from "@root/app/domains/entity/entity.models";
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