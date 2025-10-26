import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { configManager } from "@root/app/features/config/singletons/configManager.singleton";
import { TPoint } from "@root/app/features/math/types/point.type";
import { getSolutionView } from "@root/app/features/pathfinding/utils/visibilityGraph/views/getSolutionViewGroup/getSolutionViewGroup";
import { createViewGroup } from "@root/app/features/view/utils/create/createViewGroup/createViewGroup";
import { removeViewGroup } from "@root/app/features/view/utils/remove/removeViewGroup/removeViewGroup";
import { CVisibilityGraph } from "../../../components/visibilityGraph.component";
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