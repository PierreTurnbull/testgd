import { TSegment } from "@root/app/common/types/segment.types";
import { TSquareBounds } from "@root/app/common/types/squareBounds.types";
import { getPointIsInSquare } from "@root/app/common/utils/getPointIsInSquare/getPointIsInSquare";
import { getPointIsOnSegment } from "@root/app/common/utils/getPointIsOnSegment/getPointIsOnSegment";
import { getSegmentsIntersect } from "../../../../../common/utils/getSegmentsIntersect/getSegmentsIntersect";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { TRules } from "../../../types/rules.types";
import { TVisibilityGraphNode } from "../../../types/visibilityGraph.types";
import { getNodesKey } from "../../common/getNodesKey";
import { getPointIsInPolygon } from "../../common/getPointIsInPolygon/getPointIsInPolygon";
import { getPointKey } from "../../common/getPointKey";
import { getShapeSegments } from "../createShapesSegments/createShapesSegments";

export const createLinkedNodesPerformanceTimers = {
	getPointsFormSegmentInAShapeCount:             0,
	getPointsFormSegmentInAShape:                  0,
	getSegmentIntersectsWithSomeOtherSegmentCount: 0,
	getSegmentIntersectsWithSomeOtherSegment:      0,
	getSegmentIsInsideAShapeCount:                 0,
	getSegmentIsInsideAShape:                      0,
	getSomeNodeIsOnTheSegmentCount:                0,
	getSomeNodeIsOnTheSegment:                     0,
};

/**
 * Returns whether one of the points in in the area of a shape. Points on the shape's segments are not taken into account.
 */
const getPointsFormSegmentInAShape = (
	nodeA: TVisibilityGraphNode,
	nodeB: TVisibilityGraphNode,
	shapesSegments: CVisibilityGraph["shapesSegments"],
) => {
	const start = performance.now();
	createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShapeCount++;

	const pointsFormSegmentInShape = shapesSegments.some(shapeSegments => {
		const segmentAsOnSegment: TSegment[] = [];
		const segmentBsOnSegment: TSegment[] = [];

		shapeSegments.forEach(segment => {
			const nodeAIsOnSegment = getPointIsOnSegment(nodeA.point, segment);
			const nodeBIsOnSegment = getPointIsOnSegment(nodeB.point, segment);

			if (nodeAIsOnSegment) segmentAsOnSegment.push(segment);
			if (nodeBIsOnSegment) segmentBsOnSegment.push(segment);
		});

		const bothPointsAreInSegmentsOfTheSameShape = segmentAsOnSegment.length > 0 && segmentBsOnSegment.length > 0;
		const pointsAreOnTheSameSegment = segmentAsOnSegment.some(segmentA => {
			return segmentBsOnSegment.some(segmentB => {
				return (
					(
						(segmentA[0].x === segmentB[0].x && segmentA[0].y === segmentB[0].y) &&
						(segmentA[1].x === segmentB[1].x && segmentA[1].y === segmentB[1].y)
					) ||
					(
						(segmentA[0].x === segmentB[1].x && segmentA[0].y === segmentB[1].y) &&
						(segmentA[1].x === segmentB[0].x && segmentA[1].y === segmentB[0].y)
					)
				);
			});
		});

		const pointsFormSegmentInShape = bothPointsAreInSegmentsOfTheSameShape && !pointsAreOnTheSameSegment;

		return pointsFormSegmentInShape;
	});

	const end = performance.now();
	createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShape += end - start;

	return pointsFormSegmentInShape;
};

/**
 * Returns whether segmentA intersects with any other segment.
 */
const getSegmentIntersectsWithSomeOtherSegment = (
	segmentA: TSegment,
	shapeSegments: CVisibilityGraph["shapeSegments"],
) => {
	const start = performance.now();
	createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegmentCount++;

	const segmentIntersectsWithSomeOtherSegment = shapeSegments.some(segmentB =>  {
		const segmentsIntersect = getSegmentsIntersect(segmentA, segmentB);
		const somePointIsOnTheOppositeSegment = (
			getPointIsOnSegment(segmentA[0], segmentB) ||
			getPointIsOnSegment(segmentA[1], segmentB)
		);

		return segmentsIntersect && !somePointIsOnTheOppositeSegment;
	});

	const end = performance.now();
	createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegment += end - start;

	return segmentIntersectsWithSomeOtherSegment;
};

/**
 * Returns whether one of the extremities of a segment is inside a shape. Points on the shape's segments are not taken into account.
 */
const getSegmentIsInsideAShape = (
	nodeA: TVisibilityGraphNode,
	nodeB: TVisibilityGraphNode,
	extendedHitboxesPoints: CVisibilityGraph["extendedHitboxesPoints"],
) => {
	const start = performance.now();
	createLinkedNodesPerformanceTimers.getSegmentIsInsideAShapeCount++;

	const segmentIsInsideAShape = extendedHitboxesPoints.some(extendedHitboxPoints => {
		const segments = getShapeSegments(extendedHitboxPoints);

		const aCollides = getPointIsInPolygon(nodeA.point, extendedHitboxPoints);
		const pointAIsOnASegment = segments.some(segment => getPointIsOnSegment(nodeA.point, segment));

		const bCollides = getPointIsInPolygon(nodeB.point, extendedHitboxPoints);
		const pointBIsOnASegment = segments.some(segment => getPointIsOnSegment(nodeB.point, segment));

		return (aCollides && !pointAIsOnASegment) || (bCollides && !pointBIsOnASegment);
	});

	const end = performance.now();
	createLinkedNodesPerformanceTimers.getSegmentIsInsideAShape += end - start;

	// console.timeEnd("a");
	return segmentIsInsideAShape;
};

/**
 * Returns whether some point is on the segment. This prevents creating redundant collinear segments.
 */
const getSomeNodeIsOnTheSegment = (
	segment: TSegment,
	nodes: TVisibilityGraphNode[],
) => {
	const start = performance.now();
	createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegmentCount++;

	const someNodeIsOnTheSegment = nodes.some(node => {
		const pointAKey = getPointKey(segment[0]);
		const pointBKey = getPointKey(segment[1]);

		if (node.key === pointAKey || node.key === pointBKey) {
			return false;
		}

		return getPointIsOnSegment(node.point, segment);
	});

	const end = performance.now();
	createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegment += end - start;

	return someNodeIsOnTheSegment;
};

/**
 * Returns a smaller list of shapes segments, filtered with cheap calculations.
 * Only the shapes which bounding square includes either of the two nodes are kept.
 * This makes the algorithm faster globally.
 */
const getFilteredShapesSegments = (
	nodeA: TVisibilityGraphNode,
	nodeB: TVisibilityGraphNode,
	visibilityGraphComponent: CVisibilityGraph,
) => {
	const filteredShapesSegments: TSegment[][] = [];

	const pointA = nodeA.point;
	const pointB = nodeB.point;

	visibilityGraphComponent.extendedHitboxesPoints.forEach(extendedHitboxPoints => {
		const squareBounds: TSquareBounds = {
			minX: Infinity,
			maxX: -Infinity,
			minY: Infinity,
			maxY: -Infinity,
		};

		extendedHitboxPoints.forEach(extendedHitboxPoint => {
			if (extendedHitboxPoint.x < squareBounds.minX) squareBounds.minX = extendedHitboxPoint.x;
			if (extendedHitboxPoint.x > squareBounds.maxX) squareBounds.maxX = extendedHitboxPoint.x;
			if (extendedHitboxPoint.y < squareBounds.minY) squareBounds.minY = extendedHitboxPoint.y;
			if (extendedHitboxPoint.y > squareBounds.maxY) squareBounds.maxY = extendedHitboxPoint.y;
		});

		const pointAIsInArea = getPointIsInSquare(pointA, squareBounds);
		if (pointAIsInArea) return filteredShapesSegments.push(getShapeSegments(extendedHitboxPoints));

		const pointBIsInArea = getPointIsInSquare(pointB, squareBounds);
		if (pointBIsInArea) return filteredShapesSegments.push(getShapeSegments(extendedHitboxPoints));
	});

	return filteredShapesSegments;
};

/**
 * Returns whether nodeA and nodeB can be linked.
 */
export const getCanLinkNodes = (
	nodeA: TVisibilityGraphNode,
	nodeB: TVisibilityGraphNode,
	visibilityGraphComponent: CVisibilityGraph,
	rules?: TRules,
) => {
	if (nodeA.key === nodeB.key) return false;

	if (rules?.someNodeIsOnTheSegment !== false && getSomeNodeIsOnTheSegment([nodeA.point, nodeB.point], visibilityGraphComponent.nodes)) return false;
	if (rules?.segmentIntersectsWithSomeOtherSegment !== false && getSegmentIntersectsWithSomeOtherSegment([nodeA.point, nodeB.point], visibilityGraphComponent.shapeSegments)) return false;
	const filteredShapesSegments = getFilteredShapesSegments(nodeA, nodeB, visibilityGraphComponent);
	if (rules?.pointsFormSegmentInAShape !== false && getPointsFormSegmentInAShape(nodeA, nodeB, filteredShapesSegments)) return false;
	if (rules?.segmentIsInsideAShape !== false && getSegmentIsInsideAShape(nodeA, nodeB, visibilityGraphComponent.extendedHitboxesPoints)) return false;

	return true;
};

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