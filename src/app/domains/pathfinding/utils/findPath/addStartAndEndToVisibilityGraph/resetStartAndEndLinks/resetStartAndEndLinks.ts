import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";

/**
 * Resets links related to the start and end of the path.
 */
export const resetStartAndEndLinks = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	visibilityGraphComponent.fromLinkedNodes.clear();
	visibilityGraphComponent.fromLinkedNodeViews.forEach(fromNodeLinkView => fromNodeLinkView.destroy());
	visibilityGraphComponent.fromLinkedNodeViews = [];

	visibilityGraphComponent.toLinkedNodes.clear();
	visibilityGraphComponent.toLinkedNodeViews.forEach(toNodeLinkView => toNodeLinkView.destroy());
	visibilityGraphComponent.toLinkedNodeViews = [];

	visibilityGraphComponent.toAreaLinkedNodes.clear();
	visibilityGraphComponent.toAreaLinkedNodeViews.forEach(toNodeLinkView => toNodeLinkView.destroy());
	visibilityGraphComponent.toAreaLinkedNodeViews = [];
};