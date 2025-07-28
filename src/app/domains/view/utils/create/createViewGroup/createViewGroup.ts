import { Component } from "@root/app/common/components/component.models";
import { ConstructorOf } from "@root/app/common/types/constructor.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { ViewContainer } from "pixi.js";

/**
 * Create a view group represented by componentClass.
 */
export const createViewGroup = <TComponent extends Component>(
	entity: Entity,
	componentClass: ConstructorOf<TComponent>,
	getViewGroup: (entity: Entity) => ViewContainer[],
	key: keyof TComponent,
) => {
	const viewComponent = entity.getComponent(componentClass);

	const viewGroup = getViewGroup(entity);

	viewGroup.forEach(view => {
		worldManager.world.addChild(view);
	})

	;(viewComponent[key] as ViewContainer[] | null) = viewGroup;
};