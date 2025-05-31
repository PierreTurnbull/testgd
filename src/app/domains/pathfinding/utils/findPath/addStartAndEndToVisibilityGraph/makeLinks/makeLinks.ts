import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { getNodesKey } from "../../../common/getNodesKey";
import { getLinkedNodeView } from "../../../createVisibilityGraph/createVisibilityGraphViews/createNodeLinkViews/createNodeLinkViews";

/**
 * Apply the links found in linksResult.
 */
export const makeLinks = (
	visibilityGraphComponent: CVisibilityGraph,
	nodesWithEntity: TVisibilityGraphNode[],
	linksResult: Record<string, boolean>,
	fromNode: TVisibilityGraphNode,
	toNode: TVisibilityGraphNode,
	toAreaGraphNodes: TVisibilityGraphNode[] | null,
) => {
	for (let i = 0; i < nodesWithEntity.length; i++) {
		const nodeB = nodesWithEntity[i];

		const canLinkFromNode = linksResult[getNodesKey(fromNode, nodeB)];
		const canLinkToNode = linksResult[getNodesKey(toNode, nodeB)];

		if (canLinkFromNode) {
			const key = getNodesKey(fromNode, nodeB);

			const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [fromNode, nodeB];
			visibilityGraphComponent.fromLinkedNodes.set(key, nodesLink);
			fromNode.linkedNodes.push(nodeB);
			nodeB.linkedNodes.push(fromNode);
		}
		if (canLinkToNode) {
			const key = getNodesKey(toNode, nodeB);

			const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toNode, nodeB];
			visibilityGraphComponent.toLinkedNodes.set(key, nodesLink);
			toNode.linkedNodes.push(nodeB);
			nodeB.linkedNodes.push(toNode);
		}

		if (toAreaGraphNodes) {
			for (let i = 0; i < toAreaGraphNodes.length; i++) {
				const toAreaGraphNode = toAreaGraphNodes[i];

				const canLinkToAreaNode = linksResult[getNodesKey(toAreaGraphNode, nodeB)];

				if (canLinkToAreaNode) {
					const key = getNodesKey(toAreaGraphNode, nodeB);

					const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toAreaGraphNode, nodeB];
					visibilityGraphComponent.toAreaLinkedNodes.set(key, nodesLink);
					toAreaGraphNode.linkedNodes.push(nodeB);
					nodeB.linkedNodes.push(toAreaGraphNode);
				}
			}
		}
	}

	const canLinkFromAndToNode = linksResult[getNodesKey(fromNode, toNode)];

	if (canLinkFromAndToNode) {
		const key = getNodesKey(fromNode, toNode);

		const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [fromNode, toNode];
		visibilityGraphComponent.fromLinkedNodes.set(key, nodesLink);
		fromNode.linkedNodes.push(toNode);
		toNode.linkedNodes.push(fromNode);
	}

	if (toAreaGraphNodes) {
		for (let i = 0; i < toAreaGraphNodes.length; i++) {
			const toAreaGraphNode = toAreaGraphNodes[i];

			const canLinkFromNode = linksResult[getNodesKey(toAreaGraphNode, fromNode)];
			const canLinkToNode = linksResult[getNodesKey(toAreaGraphNode, toNode)];

			if (canLinkFromNode) {
				const key = getNodesKey(toAreaGraphNode, fromNode);

				const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toAreaGraphNode, fromNode];
				visibilityGraphComponent.toAreaLinkedNodes.set(key, nodesLink);
				toAreaGraphNode.linkedNodes.push(fromNode);
				fromNode.linkedNodes.push(toAreaGraphNode);
			}
			if (canLinkToNode) {
				const key = getNodesKey(toAreaGraphNode, toNode);

				const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toAreaGraphNode, toNode];
				visibilityGraphComponent.toAreaLinkedNodes.set(key, nodesLink);
				toAreaGraphNode.linkedNodes.push(toNode);
				toNode.linkedNodes.push(toAreaGraphNode);
			}
		}
	}

	if (configManager.config.debug.showsVisibilityGraphNodeLinks) {
		visibilityGraphComponent.fromLinkedNodes.forEach(nodePair => {
			const nodeLinkView = getLinkedNodeView(nodePair, 0xff00ff);
			worldManager.world.addChild(nodeLinkView);
			visibilityGraphComponent.fromLinkedNodeViews.push(nodeLinkView);
		});
		visibilityGraphComponent.toLinkedNodes.forEach(nodePair => {
			const nodeLinkView = getLinkedNodeView(nodePair, 0xff00ff);
			worldManager.world.addChild(nodeLinkView);
			visibilityGraphComponent.toLinkedNodeViews.push(nodeLinkView);
		});
		visibilityGraphComponent.toAreaLinkedNodes.forEach(nodePair => {
			const nodeLinkView = getLinkedNodeView(nodePair, 0xffaaaa);
			worldManager.world.addChild(nodeLinkView);
			visibilityGraphComponent.toAreaLinkedNodeViews.push(nodeLinkView);
		});
	}
};