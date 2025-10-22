import { Entity } from "@root/app/domains/entity/entity.models";
import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../pathfinding/components/visibilityGraph/visibilityGraph.component";

const getToAreaLinkedNodeView = (toAreaLinkedNode: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
	const toAreaLinkedNodeView = new Graphics();

	toAreaLinkedNodeView.poly(toAreaLinkedNode.map(visibilityGraphNode => visibilityGraphNode.point));

	toAreaLinkedNodeView
		.stroke({
			width:     1,
			color:     0xffff00,
			alignment: 0.5,
		});

	return toAreaLinkedNodeView;
};

export const getToAreaLinkedNodeViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const toAreaLinkedNodeViewGroup = Object.values(visibilityGraphComponent.toAreaLinkedNodes).map((node: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
		const toAreaLinkedNodeView = getToAreaLinkedNodeView(node);

		return toAreaLinkedNodeView;
	});

	return toAreaLinkedNodeViewGroup;
};