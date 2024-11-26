import { TPoint } from "@root/app/common/types/point.type";
import { CVisibilityGraph } from "../../../components/visibilityGraph.component";

/**
 * Returns pairs of nodes that are siblings.
 */
export const getShapeSegments = (
	extendedHitboxPoints: TPoint[],
) => {
	const segments: CVisibilityGraph["shapesSegments"][number] = [];

	extendedHitboxPoints.forEach((pointC, key) => {
		// next point. if we reached the end, use the first point instead,
		// as the first point follows the last point.
		const pointD = extendedHitboxPoints[key + 1] || extendedHitboxPoints[0];

		segments.push([pointC, pointD]);
	});

	return segments;
};

/**
 * Returns pairs of nodes that are siblings, for each extended hitbox.
 */
export const getShapesSegments = (
	extendedHitboxesPoints: CVisibilityGraph["extendedHitboxesPoints"],
) => {
	const shapesSegments: CVisibilityGraph["shapesSegments"] = [];

	extendedHitboxesPoints.forEach(extendedHitboxPoints => {
		const shapeSegments = getShapeSegments(extendedHitboxPoints);

		shapesSegments.push(shapeSegments);
	});

	return shapesSegments;
};

/**
 * Returns pairs of nodes that are siblings in the same shape.
 */
export const createShapesSegments = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	const shapesSegments = getShapesSegments(visibilityGraphComponent.extendedHitboxesPoints);

	visibilityGraphComponent.shapeSegments = shapesSegments.flat();
	visibilityGraphComponent.shapesSegments = shapesSegments;
};