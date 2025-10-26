import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TVisibilityGraphNode } from "@root/app/features/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";

const getToLinkedNodeView = (toLinkedNode: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
	const toLinkedNodeView = new Graphics();

	toLinkedNodeView.poly(toLinkedNode.map(visibilityGraphNode => visibilityGraphNode.point));

	toLinkedNodeView
		.stroke({
			width:     1,
			color:     0x77bb77,
			alignment: 0.5,
		});

	return toLinkedNodeView;
};

export const getToLinkedNodeViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const toLinkedNodeViewGroup: Graphics[] = [];

	for (const [_, value] of visibilityGraphComponent.toLinkedNodes) {
		const toLinkedNodeView = getToLinkedNodeView(value);

		toLinkedNodeViewGroup.push(toLinkedNodeView);
	}

	return toLinkedNodeViewGroup;
};