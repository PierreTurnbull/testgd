import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";

/**
 * Resets links related to the start and end of the path.
 */
export const resetStartAndEndLinks = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	visibilityGraphComponent.fromLinkedNodes.clear();
	visibilityGraphComponent.toLinkedNodes.clear();
	visibilityGraphComponent.toAreaLinkedNodes.clear();
};