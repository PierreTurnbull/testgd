import { Component } from "@root/app/common/components/component.models";
import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { ViewContainer } from "pixi.js";

/**
 * Create a view represented by componentClass for each entity that supports it.
 */
export const createView = <TComponent extends Component>(
	entity: Entity,
	componentClass: ConstructorOf<TComponent>,
	getView: (entity: Entity) => ViewContainer,
	key: keyof TComponent,
) => {
	const viewComponent = entity.getComponent(componentClass);

	const view = getView(entity);

	worldManager.world.addChild(view);

	;(viewComponent[key] as ViewContainer | null) = view;
};