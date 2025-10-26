import { TSegment } from "@root/app/features/math/types/segment.types";
import { TSquareBounds } from "@root/app/features/math/types/squareBounds.types";
import { getPointIsInSquare } from "@root/app/features/math/utils/getPointIsInSquare/getPointIsInSquare";
import { getPointIsOnSegment } from "@root/app/features/math/utils/getPointIsOnSegment/getPointIsOnSegment";
import { getSegmentsIntersect } from "@root/app/features/math/utils/getSegmentsIntersect/getSegmentsIntersect";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
import { TRules } from "@root/app/features/pathfinding/types/rules.types";
import { TVisibilityGraphNode } from "@root/app/features/pathfinding/types/visibilityGraph.types";
import { getPointIsInPolygon } from "@root/app/features/pathfinding/utils/common/getPointIsInPolygon/getPointIsInPolygon";
import { getPointKey } from "@root/app/features/pathfinding/utils/common/getPointKey/getPointKey";
import { getShapeSegments } from "@root/app/features/pathfinding/utils/visibilityGraph/createVisibilityGraph/createShapesSegments/createShapesSegments";

/**
 * Returns whether one of the points in in the area of a shape. Points on the shape's segments are not taken into account.
 */
const getPointsFormSegmentInAShape = (
	nodeA: TVisibilityGraphNode,
	nodeB: TVisibilityGraphNode,
	shapesSegments: CVisibilityGraph["shapesSegments"],
) => {
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

	return pointsFormSegmentInShape;
};

/**
 * Returns whether segmentA intersects with any other segment.
 */
const getSegmentIntersectsWithSomeOtherSegment = (
	segmentA: TSegment,
	shapeSegments: CVisibilityGraph["shapeSegments"],
) => {
	const segmentIntersectsWithSomeOtherSegment = shapeSegments.some(segmentB =>  {
		const segmentsIntersect = getSegmentsIntersect(segmentA, segmentB);
		const somePointIsOnTheOppositeSegment = (
			getPointIsOnSegment(segmentA[0], segmentB) ||
			getPointIsOnSegment(segmentA[1], segmentB)
		);

		return segmentsIntersect && !somePointIsOnTheOppositeSegment;
	});

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
	const segmentIsInsideAShape = extendedHitboxesPoints.some(extendedHitboxPoints => {
		const segments = getShapeSegments(extendedHitboxPoints);

		const aCollides = getPointIsInPolygon(nodeA.point, extendedHitboxPoints);
		const pointAIsOnASegment = segments.some(segment => getPointIsOnSegment(nodeA.point, segment));

		const bCollides = getPointIsInPolygon(nodeB.point, extendedHitboxPoints);
		const pointBIsOnASegment = segments.some(segment => getPointIsOnSegment(nodeB.point, segment));

		return (aCollides && !pointAIsOnASegment) || (bCollides && !pointBIsOnASegment);
	});

	return segmentIsInsideAShape;
};

/**
 * Returns whether some point is on the segment. This prevents creating redundant collinear segments.
 */
const getSomeNodeIsOnTheSegment = (
	segment: TSegment,
	nodes: Pick<TVisibilityGraphNode, "key" | "point">[],
) => {
	const someNodeIsOnTheSegment = nodes.some(node => {
		const pointAKey = getPointKey(segment[0]);
		const pointBKey = getPointKey(segment[1]);

		if (node.key === pointAKey || node.key === pointBKey) {
			return false;
		}

		return getPointIsOnSegment(node.point, segment);
	});

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
	visibilityGraphComponent: Pick<CVisibilityGraph, "extendedHitboxesPoints" | "nodes" | "shapeSegments">,
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
	visibilityGraphComponent: Pick<CVisibilityGraph, "extendedHitboxesPoints" | "nodes" | "shapeSegments">,
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