import { TPoint } from "@root/app/common/types/point.type";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { replaceSolutionViewGroup } from "../../common/views/replaceSolutionViewGroup/replaceSolutionViewGroup";
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

	visibilityGraphComponent.solution = solution;

	if (solution) {
		replaceSolutionViewGroup(entity, solution);
	} else {
		visibilityGraphComponent.solutionViewGroup?.forEach(nodeView => nodeView.destroy());
		visibilityGraphComponent.solutionViewGroup = [];
	}

	if (!solution && visibilityGraphComponent.extendedHitboxesPointsSystem) {
		unblockEntity(entity);
	}
};