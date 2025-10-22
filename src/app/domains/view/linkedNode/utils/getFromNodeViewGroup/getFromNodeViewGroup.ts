import { Entity } from "@root/app/domains/entity/entity.models";
import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../pathfinding/components/visibilityGraph/visibilityGraph.component";

const getFromLinkedNodeView = (fromLinkedNode: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
	const fromLinkedNodeView = new Graphics();

	console.log(fromLinkedNode);
	fromLinkedNodeView.poly(fromLinkedNode.map(visibilityGraphNode => visibilityGraphNode.point));

	fromLinkedNodeView
		.stroke({
			width:     1,
			color:     0xffff00,
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