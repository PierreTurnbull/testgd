import { TPoint } from "@root/app/common/types/point.type";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { initSolutionViewGroup } from "../initSolutionViewGroup/initSolutionViewGroup";

export const replaceSolutionViewGroup = (
	entity: Entity,
	solution: TPoint[],
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const prevSolutionViewGroup = visibilityGraphComponent.solutionViewGroup;

	visibilityGraphComponent.solutionViewGroup = null;
	prevSolutionViewGroup?.forEach(view => view.removeFromParent());

	initSolutionViewGroup(entity, solution);
};