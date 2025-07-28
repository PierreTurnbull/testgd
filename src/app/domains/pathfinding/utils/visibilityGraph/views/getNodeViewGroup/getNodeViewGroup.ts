import { Entity } from "@root/app/domains/entity/entity.models";
import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";

const getVisibilityGraphNodeView = (node: TVisibilityGraphNode) => {
	const nodeView = new Graphics();
	
	nodeView.circle(node.point.x, node.point.y, 5);

	nodeView
		.stroke({
			width:     1,
			color:     0x77bb77,
			alignment: 0.5,
		});

	return nodeView;
};

export const getVisibilityGraphNodeViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const visibilityGraphNodeViewGroup = visibilityGraphComponent.nodes.map(node => {
		const visibilityGraphNodeView = getVisibilityGraphNodeView(node);

		return visibilityGraphNodeView;
	});

	return visibilityGraphNodeViewGroup;
};