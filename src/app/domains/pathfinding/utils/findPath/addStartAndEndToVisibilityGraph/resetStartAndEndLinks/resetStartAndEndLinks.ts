import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";

/**
 * Resets links related to the start and end of the path.
 */
export const resetStartAndEndLinks = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	visibilityGraphComponent.fromLinkedNodes.clear();
	visibilityGraphComponent.fromLinkedNodeViewGroup.forEach(fromNodeLinkView => fromNodeLinkView.destroy());
	visibilityGraphComponent.fromLinkedNodeViewGroup = [];

	visibilityGraphComponent.toLinkedNodes.clear();
	visibilityGraphComponent.toLinkedNodeViewGroup.forEach(toNodeLinkView => toNodeLinkView.destroy());
	visibilityGraphComponent.toLinkedNodeViewGroup = [];

	visibilityGraphComponent.toAreaLinkedNodes.clear();
	visibilityGraphComponent.toAreaLinkedNodeViewGroup.forEach(toNodeLinkView => toNodeLinkView.destroy());
	visibilityGraphComponent.toAreaLinkedNodeViewGroup = [];
};