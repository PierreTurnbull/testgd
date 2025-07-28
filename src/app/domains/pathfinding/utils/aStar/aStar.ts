import { TPoint } from "@root/app/common/types/point.type";
import { getDistance } from "@root/app/common/utils/geometry/getDistance/getDistance";
import { MinHeap } from "@root/app/common/utils/minHeap/minHeap";
import { TGraphNode } from "../../types/pathfinding.types";
import { TVisibilityGraphNode } from "../../types/visibilityGraph.types";

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
	fromNode: TVisibilityGraphNode | null,
	toNode: TVisibilityGraphNode | null,
) => {
	const comparator = (a: TGraphNode, b: TGraphNode) => a.totalDistanceEstimation - b.totalDistanceEstimation;
	const openSet = new MinHeap(comparator);
	const closedSet = new Set<TGraphNode["key"]>();

	if (!fromNode) {
		throw new Error("Missing fromNode.");
	}
	if (!toNode) {
		throw new Error("Missing toNode.");
	}

	openSet.insert({
		key:                     fromNode.key,
		point:                   fromNode.point,
		linkedNodes:             fromNode.linkedNodes,
		distance:                0,
		totalDistanceEstimation: getDistance(fromNode.point, toNode.point),
		parent:                  null,
		isSuccess:               fromNode.isSuccess,
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

		const linkedNodes = getLinkedNodes(currentNode, toNode.point, closedSet);

		for (let i = 0; i < linkedNodes.length; i++) {
			const linkedNode = linkedNodes[i];

			const existingValueInOpenSet = openSet.values.find(value => value.key === linkedNode.key);

			if (existingValueInOpenSet) {
				const linkedNodeIsCloser = linkedNode.totalDistanceEstimation < existingValueInOpenSet.totalDistanceEstimation;

				// if the current node is closer than the existing node, replace the latter with the former
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