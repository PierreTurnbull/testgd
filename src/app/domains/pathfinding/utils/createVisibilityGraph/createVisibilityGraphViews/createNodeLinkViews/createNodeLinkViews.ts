import { configManager } from "@root/app/core/configManager/configManager.singleton";
import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { TVisibilityGraphNode } from "../../../../types/visibilityGraph.types";
import { Graphics } from "pixi.js";

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