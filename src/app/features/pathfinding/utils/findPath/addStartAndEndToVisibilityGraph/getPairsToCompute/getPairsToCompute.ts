import { TVisibilityGraphNode } from "@root/app/features/pathfinding/types/visibilityGraph.types";
import { getNodesKey } from "../../../common/getNodesKey/getNodesKey";
import { TPairsToCompute } from "../types/pairsToCompute.types";

/**
 * Returns all the fresh pairs of nodes that might be linked. These links are based on nodes that were freshly created
 * based on start and end nodes. For each of them, we need to know if they can be linked together.
 */
export const getPairsToCompute = (
	nodesWithEntity: TVisibilityGraphNode[],
	fromNode: TVisibilityGraphNode,
	toNode: TVisibilityGraphNode,
	toAreaGraphNodes: TVisibilityGraphNode[] | null,
) => {
	const pairsToCompute: TPairsToCompute = {};
	const setPairsToCompute = (
		nodeA: TVisibilityGraphNode,
		nodeB: TVisibilityGraphNode,
	) => {
		const nodesKey = getNodesKey(nodeA, nodeB);
		const nodes = { nodeA, nodeB };

		pairsToCompute[nodesKey] = nodes;
	};

	setPairsToCompute(fromNode, toNode);

	for (let i = 0; i < nodesWithEntity.length; i++) {
		const nodeB = nodesWithEntity[i];

		setPairsToCompute(fromNode, nodeB);
		setPairsToCompute(toNode, nodeB);

		if (toAreaGraphNodes) {
			for (let i = 0; i < toAreaGraphNodes.length; i++) {
				const toAreaGraphNode = toAreaGraphNodes[i];

				setPairsToCompute(toAreaGraphNode, nodeB);
			}
		}
	}

	if (toAreaGraphNodes) {
		for (let i = 0; i < toAreaGraphNodes.length; i++) {
			const toAreaGraphNode = toAreaGraphNodes[i];

			setPairsToCompute(toAreaGraphNode, fromNode);
			setPairsToCompute(toAreaGraphNode, toNode);
		}
	}

	return pairsToCompute;
};