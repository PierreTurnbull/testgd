import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TVisibilityGraphNode } from "@root/app/features/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";

const getToAreaLinkedNodeView = (toAreaLinkedNode: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
	const toAreaLinkedNodeView = new Graphics();

	toAreaLinkedNodeView.poly(toAreaLinkedNode.map(visibilityGraphNode => visibilityGraphNode.point));

	toAreaLinkedNodeView
		.stroke({
			width:     1,
			color:     0x77bb77,
			alignment: 0.5,
		});

	return toAreaLinkedNodeView;
};

export const getToAreaLinkedNodeViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const toAreaLinkedNodeViewGroup: Graphics[] = [];

	for (const [_, value] of visibilityGraphComponent.toAreaLinkedNodes) {
		const toAreaLinkedNodeView = getToAreaLinkedNodeView(value);

		toAreaLinkedNodeViewGroup.push(toAreaLinkedNodeView);
	}

	return toAreaLinkedNodeViewGroup;
};