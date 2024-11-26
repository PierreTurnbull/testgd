import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { TVisibilityGraphNode } from "../../../types/visibilityGraph.types";
import { getPointKey } from "../../common/getPointKey";

/**
 * Creates a list of nodes. Each node is connected to its siblings in the same shape.
 */
export const createNodes = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	const nodes: TVisibilityGraphNode[] = [];

	visibilityGraphComponent.extendedHitboxesPoints.forEach(points => {
		const newNodes = points.map(point => {
			const node: TVisibilityGraphNode = {
				key:           getPointKey(point),
				point:         { ...point },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			};

			return node;
		});

		// adds a margin of 1 node on each end of the list, in order to easily access them as a suite of sibling nodes
		// for example, if the list if [A, B, C], siblings of A are B and C. Putting C close to A makes it easier to access A's siblings.
		const pointsSuite = [
			newNodes[newNodes.length - 1],
			...newNodes,
			newNodes[0],
		];

		// lists of nodes with their 2 siblings. For example, if the list is [A, B, C], the result is [[A, B, C], [B, C, A], [C, A, B]]
		const nodeTriads: TVisibilityGraphNode[][] = [];
		for (let i = 0; i < pointsSuite.length - 2; i++) {
			nodeTriads.push(pointsSuite.slice(i, i + 3));
		}

		nodeTriads.forEach(nodeTriad => {
			const node = nodeTriad[1];
			node.shapeSiblings.push(nodeTriad[0], nodeTriad[2]);
		});

		nodes.push(...newNodes);
	});

	visibilityGraphComponent.nodes = nodes;
};