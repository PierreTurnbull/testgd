import { TPoint } from "@root/app/common/types/point.type";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { getSolutionView } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getSolutionViewGroup/getSolutionViewGroup";
import { createViewGroup } from "@root/app/domains/view/utils/create/createViewGroup/createViewGroup";
import { removeViewGroup } from "@root/app/domains/view/utils/remove/removeViewGroup/removeViewGroup";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { unblockEntity } from "./unblockEntity/unblockEntity";

/**
 * Processes an aStar solution.
 */
export const processSolution = (
	entityId: number,
	solution: TPoint[] | null,
) => {
	const entity = entityManager.entitiesById.get(entityId);

	if (!entity) {
		throw new Error(`Entity with id ${entityId} not found.`);
	}

	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	visibilityGraphComponent.solution = solution;

	removeViewGroup(entity, CVisibilityGraph, "solutionViewGroup");
	if (solution && configManager.config.debug.showsVisibilityGraphSolution) {
		createViewGroup(entity, CVisibilityGraph, getSolutionView, "solutionViewGroup");
	}

	if (!solution && visibilityGraphComponent.extendedHitboxesPointsSystem) {
		unblockEntity(entity);
	}
};