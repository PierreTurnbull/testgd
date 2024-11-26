import { CVisibilityGraph } from "../../../components/visibilityGraph.component";

/**
 * Resets a visibility graph so it can be created again with new obstacles.
 */
export const resetVisibilityGraph = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	visibilityGraphComponent.extendedHitboxPointViews.forEach(extendedHitboxPointView => extendedHitboxPointView.destroy());
	visibilityGraphComponent.extendedHitboxViews.forEach(extendedHitboxView => extendedHitboxView.destroy());
	visibilityGraphComponent.linkedNodeViews.forEach(linkedNodeView => linkedNodeView.destroy());
	visibilityGraphComponent.fromLinkedNodeViews.forEach(fromLinkedNodeView => fromLinkedNodeView.destroy());
	visibilityGraphComponent.toLinkedNodeViews.forEach(toLinkedNodeView => toLinkedNodeView.destroy());
	visibilityGraphComponent.toAreaLinkedNodeViews.forEach(toAreaLinkedNodeView => toAreaLinkedNodeView.destroy());
	visibilityGraphComponent.highlightedNodeViews?.forEach(highlightedNodeView => highlightedNodeView.destroy());

	visibilityGraphComponent.extendedHitboxesPointsSystem = null;
	visibilityGraphComponent.extendedHitboxesPoints = [];
	visibilityGraphComponent.nodes = [];
	visibilityGraphComponent.shapeSegments = [];
	visibilityGraphComponent.shapesSegments = [];
	visibilityGraphComponent.linkedNodes = new Map();
	visibilityGraphComponent.fromLinkedNodes = new Map();
	visibilityGraphComponent.toLinkedNodes = new Map();
	visibilityGraphComponent.fromNode = null;
	visibilityGraphComponent.toNode = null;
	visibilityGraphComponent.highlightedNodes = null;
};