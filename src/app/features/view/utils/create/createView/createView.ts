import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Component } from "@root/app/ecs/components/models/component.models";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { worldManager } from "@root/app/features/world/singletons/worldManager.singleton";
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