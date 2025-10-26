import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TVisibilityGraphNode } from "@root/app/features/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";

const getFromLinkedNodeView = (fromLinkedNode: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
	const fromLinkedNodeView = new Graphics();

	fromLinkedNodeView.poly(fromLinkedNode.map(visibilityGraphNode => visibilityGraphNode.point));

	fromLinkedNodeView
		.stroke({
			width:     1,
			color:     0x77bb77,
			alignment: 0.5,
		});

	return fromLinkedNodeView;
};

export const getFromLinkedNodeViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const fromLinkedNodeViewGroup: Graphics[] = [];

	for (const [_, value] of visibilityGraphComponent.fromLinkedNodes) {
		const fromLinkedNodeView = getFromLinkedNodeView(value);

		fromLinkedNodeViewGroup.push(fromLinkedNodeView);
	}

	return fromLinkedNodeViewGroup;
};