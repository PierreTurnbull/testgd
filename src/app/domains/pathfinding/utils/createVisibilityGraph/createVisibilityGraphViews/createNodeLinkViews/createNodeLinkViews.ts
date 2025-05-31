import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";
import { TVisibilityGraphNode } from "../../../../types/visibilityGraph.types";

export const getLinkedNodeView = (
	nodePair: [TVisibilityGraphNode, TVisibilityGraphNode],
	color: number,
) => {
	const linkedNodeView = new Graphics();

	linkedNodeView.moveTo(nodePair[0].point.x, nodePair[0].point.y);
	linkedNodeView.lineTo(nodePair[1].point.x, nodePair[1].point.y);

	linkedNodeView
		.stroke({
			width:     1,
			color:     color,
			alignment: 0.5,
		});

	return linkedNodeView;
};

export const createNodeLinkViews = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	if (configManager.config.debug.showsVisibilityGraphNodeLinks) {
		visibilityGraphComponent.linkedNodes.forEach((nodePair) => {
			const linkedNodeView = getLinkedNodeView(nodePair, 0xff0000);
			worldManager.world.addChild(linkedNodeView);
			visibilityGraphComponent.linkedNodeViews.push(linkedNodeView);
		});
	}
};