import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { getAngleFromPoints } from "@root/app/features/math/utils/getAngleFromPoints/getAngleFromPoints";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";

/**
 * Returns the angle representing the direction in which the entity must move, based on the last
 * computed path from the pathfinding algorithm.
 * 
 * Since the path is computed asynchronously, the entity may overtake the next step and risk turning
 * backward. This function detects when a step has been overtaken and advances to the following one
 * if necessary. This hack enables maintaining precision while optimizing the pathfinding
 * performance.
 */
export const getNextAngle = (
	visibilityGraphComponent: CVisibilityGraph,
	entityCoordinate: TCoordinates,
) => {
	if (!visibilityGraphComponent.nextStep || !visibilityGraphComponent.solution) {
		throw new Error("Missing solution.");
	}

	const lastSolutionAngle = getAngleFromPoints(
		visibilityGraphComponent.solution[0],
		visibilityGraphComponent.solution[1],
	);
	let angle = getAngleFromPoints(
		entityCoordinate,
		visibilityGraphComponent.nextStep,
	);

	// The smallest gap between the 2 angles. 🧙
	const angleDiff = Math.abs((((lastSolutionAngle - angle) % 360) + 540) % 360 - 180);

	const entityOvertookNextStep = angleDiff > 90;
	const nextStepIsEnd = visibilityGraphComponent.solution.length === 2;
	if (entityOvertookNextStep && !nextStepIsEnd) {
		// Enable the entity to start moving towards the following step.
		visibilityGraphComponent.solution.splice(0, 2, entityCoordinate);
		angle = getAngleFromPoints(
			entityCoordinate,
			visibilityGraphComponent.nextStep,
		);
	}

	return angle;
};