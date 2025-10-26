import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TVisibilityGraphNode } from "@root/app/features/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";

const getLinkedNodeView = (linkedNode: [TVisibilityGraphNode, TVisibilityGraphNode]) => {
	const linkedNodeView = new Graphics();

	linkedNodeView.poly(linkedNode.map(visibilityGraphNode => visibilityGraphNode.point));

	linkedNodeView
		.stroke({
			width:     1,
			color:     0x77bb77,
			alignment: 0.5,
		});

	return linkedNodeView;
};

export const getLinkedNodeViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const linkedNodeViewGroup: Graphics[] = [];

	for (const [_, value] of visibilityGraphComponent.linkedNodes) {
		const linkedNodeView = getLinkedNodeView(value);

		linkedNodeViewGroup.push(linkedNodeView);
	}

	return linkedNodeViewGroup;
};