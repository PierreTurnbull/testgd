import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
import { TPairsToCompute } from "../types/pairsToCompute.types";

/**
 * Returns the worker message.
 */
export const getMessage = (
	pairsToCompute: TPairsToCompute,
	visibilityGraphComponent: CVisibilityGraph,
	entityId: number,
) => {
	// visibilityGraphComponent with the bare minimum of informations to be able to call getCanLinkNodes. As a consequence, it
	// is linear instead of circular which makes it possible to pass it to a worker.
	const linearVisibilityGraphComponent = {
		nodes: visibilityGraphComponent.nodes.map(node => {
			return {
				point: node.point,
				key:   node.key,
			};
		}),
		extendedHitboxesPoints: visibilityGraphComponent.extendedHitboxesPoints,
		shapeSegments:          visibilityGraphComponent.shapeSegments,
	};

	const message = {
		entityId:                 entityId,
		pairsToCompute:           pairsToCompute,
		visibilityGraphComponent: linearVisibilityGraphComponent,
		rules:                    { someNodeIsOnTheSegment: false },
	};

	return message;
};