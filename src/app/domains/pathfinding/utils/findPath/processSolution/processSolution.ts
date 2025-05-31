import { TPoint } from "@root/app/common/types/point.type";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { createSolutionViews } from "../createSolutionViews/createSolutionViews";
import { unblockEntity } from "../unblockEntity/unblockEntity";

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

	visibilityGraphComponent.highlightedNodes = solution;
	createSolutionViews(entity, solution);

	if (!solution && visibilityGraphComponent.extendedHitboxesPointsSystem) {
		unblockEntity(entity);
	}
};