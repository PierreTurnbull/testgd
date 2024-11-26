import { TPoint } from "@root/app/common/types/point.type";
import { getDistance } from "@root/app/common/utils/getDistance/getDistance";
import { MinHeap } from "@root/app/common/utils/minHeap/minHeap";
import { TGraphNode } from "../../../types/pathfinding.types";
import { CVisibilityGraph } from "../../../components/visibilityGraph.component";

const getLinkedNodes = (
	currentNode: TGraphNode,
	toPoint: TPoint,
	closedSet: Set<string>,
) => {
	const graphNodes: TGraphNode[] = [];

	for (let i = 0; i < currentNode.linkedNodes.length; i++) {
		const linkedNode = currentNode.linkedNodes[i];

		if (closedSet.has(linkedNode.key)) {
			continue;
		}

		const distance = currentNode.distance + getDistance(currentNode.point, linkedNode.point);
		const totalDistanceEstimation = distance + getDistance(linkedNode.point, toPoint);

		const graphNode: TGraphNode = {
			...linkedNode,
			distance:                distance,
			totalDistanceEstimation: totalDistanceEstimation,
			parent:                  currentNode,
		};

		graphNodes.push(graphNode);
	}

	return graphNodes;
};

export const aStar = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	const comparator = (a: TGraphNode, b: TGraphNode) => a.totalDistanceEstimation - b.totalDistanceEstimation;
	const openSet = new MinHeap(comparator);
	const closedSet = new Set<TGraphNode["key"]>();

	if (!visibilityGraphComponent.fromNode) {
		throw new Error("Missing fromNode.");
	}
	if (!visibilityGraphComponent.toNode) {
		throw new Error("Missing toNode.");
	}

	openSet.insert({
		key:                     visibilityGraphComponent.fromNode.key,
		point:                   visibilityGraphComponent.fromNode.point,
		linkedNodes:             visibilityGraphComponent.fromNode.linkedNodes,
		distance:                0,
		totalDistanceEstimation: getDistance(visibilityGraphComponent.fromNode.point, visibilityGraphComponent.toNode.point),
		parent:                  null,
		isSuccess:               visibilityGraphComponent.fromNode.isSuccess,
	});

	let solution: TPoint[] | null = null;

	while (!solution) {
		const currentNode = openSet.extractMin();

		// if there is no more points to explore, the target is not reachable
		if (!currentNode) {
			break;
		}

		// if the current point is toNode
		if (currentNode.isSuccess) {
			let rewindPoint: TGraphNode | null = currentNode;
			solution = [];

			do {
				solution.push({
					x: rewindPoint.point.x,
					y: rewindPoint.point.y,
				});
				rewindPoint = rewindPoint.parent;
			} while (rewindPoint);

			solution.reverse();

			break;
		}

		closedSet.add(currentNode.key);

		const linkedNodes = getLinkedNodes(currentNode, visibilityGraphComponent.toNode.point, closedSet);

		for (let i = 0; i < linkedNodes.length; i++) {
			const linkedNode = linkedNodes[i];

			const existingValueInOpenSet = openSet.values.find(value => value.key === linkedNode.key);

			// if the linked node is more optimal and the existing node, rewire the existing node in the open set to make its distance shorter
			if (existingValueInOpenSet) {
				const linkedNodeIsCloser = linkedNode.totalDistanceEstimation < existingValueInOpenSet.totalDistanceEstimation;

				if (linkedNodeIsCloser) {
					existingValueInOpenSet.distance = linkedNode.distance;
					existingValueInOpenSet.totalDistanceEstimation = linkedNode.totalDistanceEstimation;
					existingValueInOpenSet.parent = linkedNode.parent;
				}

			// by default, add the linked node to the open set
			} else {
				openSet.insert(linkedNode);
			}
		}
	}

	return solution;
};