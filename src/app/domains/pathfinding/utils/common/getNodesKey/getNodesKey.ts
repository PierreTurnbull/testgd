import { TVisibilityGraphNode } from "../../../types/visibilityGraph.types";

/**
 * Returns a unique key for the combination of nodeA and nodeB. The key is unique no matter the order,
 * meaning getNodesKey(a, b) is equivalent to getNodesKey(b, a).
 */
export const getNodesKey = (
	nodeA: TVisibilityGraphNode,
	nodeB: TVisibilityGraphNode,
) => {
	const keys = [nodeA.key, nodeB.key].sort();
	const key = keys.join(":");

	return key;
};