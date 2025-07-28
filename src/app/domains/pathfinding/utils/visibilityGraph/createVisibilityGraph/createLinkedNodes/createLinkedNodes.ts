import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";
import { TVisibilityGraphNode } from "../../../../types/visibilityGraph.types";
import { getNodesKey } from "../../../common/getNodesKey/getNodesKey";
import { getCanLinkNodes } from "./getCanLinkNodes/getCanLinkNodes";

/**
 * Creates linkedNodes. Nodes can be linked following multiple rules.
 * Ultimately, these links are used to find available paths to navigate the graph.
 */
export const createLinkedNodes = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	const linkedNodes = new Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]>();

	const checkedCombinations = new Set<string>();

	visibilityGraphComponent.nodes.forEach(nodeA => {
		visibilityGraphComponent.nodes.forEach(nodeB => {
			const nodesKey = getNodesKey(nodeA, nodeB);
			
			if (checkedCombinations.has(nodesKey)) return;
			checkedCombinations.add(nodesKey);

			const canLinkNodes = getCanLinkNodes(nodeA, nodeB, visibilityGraphComponent);

			if (canLinkNodes) {
				linkedNodes.set(nodesKey, [nodeA, nodeB]);
				nodeA.linkedNodes.push(nodeB);
				nodeB.linkedNodes.push(nodeA);
			}
		});
	});

	visibilityGraphComponent.linkedNodes = linkedNodes;
};