import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";

/**
 * Resets a visibility graph so it can be created again with new obstacles.
 */
export const resetVisibilityGraph = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	visibilityGraphComponent.extendedHitboxPointViewGroup.forEach(extendedHitboxPointView => extendedHitboxPointView.destroy());
	visibilityGraphComponent.extendedHitboxViewGroup.forEach(extendedHitboxView => extendedHitboxView.destroy());
	visibilityGraphComponent.linkedNodeViewGroup.forEach(linkedNodeView => linkedNodeView.destroy());
	visibilityGraphComponent.fromLinkedNodeViewGroup.forEach(fromLinkedNodeView => fromLinkedNodeView.destroy());
	visibilityGraphComponent.toLinkedNodeViewGroup.forEach(toLinkedNodeView => toLinkedNodeView.destroy());
	visibilityGraphComponent.toAreaLinkedNodeViewGroup.forEach(toAreaLinkedNodeView => toAreaLinkedNodeView.destroy());
	visibilityGraphComponent.solutionViewGroup?.forEach(solutionView => solutionView.destroy());

	visibilityGraphComponent.extendedHitboxPointViewGroup = [];
	visibilityGraphComponent.extendedHitboxViewGroup = [];
	visibilityGraphComponent.linkedNodeViewGroup = [];
	visibilityGraphComponent.fromLinkedNodeViewGroup = [];
	visibilityGraphComponent.toLinkedNodeViewGroup = [];
	visibilityGraphComponent.toAreaLinkedNodeViewGroup = [];
	visibilityGraphComponent.solutionViewGroup = [];
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
	visibilityGraphComponent.solution = null;
};