import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";

/**
 * Resets a visibility graph so it can be created again with new obstacles.
 */
export const resetVisibilityGraph = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	visibilityGraphComponent.extendedHitboxPointViewGroup?.forEach(extendedHitboxPointView => extendedHitboxPointView.destroy());
	visibilityGraphComponent.extendedHitboxViewGroup?.forEach(extendedHitboxView => extendedHitboxView.destroy());
	visibilityGraphComponent.nodeViewGroup?.forEach(nodeView => nodeView.destroy());
	visibilityGraphComponent.linkedNodeViewGroup?.forEach(linkedNodeView => linkedNodeView.destroy());
	visibilityGraphComponent.fromLinkedNodeViewGroup?.forEach(fromLinkedNodeView => fromLinkedNodeView.destroy());
	visibilityGraphComponent.toLinkedNodeViewGroup?.forEach(toLinkedNodeView => toLinkedNodeView.destroy());
	visibilityGraphComponent.toAreaLinkedNodeViewGroup?.forEach(toAreaLinkedNodeView => toAreaLinkedNodeView.destroy());
	visibilityGraphComponent.solutionViewGroup?.forEach(solutionView => solutionView.destroy());

	visibilityGraphComponent.extendedHitboxPointViewGroup = null;
	visibilityGraphComponent.extendedHitboxViewGroup = null;
	visibilityGraphComponent.nodeViewGroup = null;
	visibilityGraphComponent.linkedNodeViewGroup = null;
	visibilityGraphComponent.fromLinkedNodeViewGroup = null;
	visibilityGraphComponent.toLinkedNodeViewGroup = null;
	visibilityGraphComponent.toAreaLinkedNodeViewGroup = null;
	visibilityGraphComponent.solutionViewGroup = null;
	visibilityGraphComponent.extendedHitboxesPointsSystem = null;
	visibilityGraphComponent.extendedHitboxesPoints = [];
	visibilityGraphComponent.nodes = [];
	visibilityGraphComponent.shapeSegments = [];
	visibilityGraphComponent.shapesSegments = [];
	visibilityGraphComponent.linkedNodes = new Map();
	visibilityGraphComponent.fromLinkedNodes = new Map();
	visibilityGraphComponent.toLinkedNodes = new Map();
	visibilityGraphComponent.solution = null;
};