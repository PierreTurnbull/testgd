import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";

export const removeSolutionViewGroups = () => {
	entityManager.entities.forEach(entity => {
		if (entity.hasComponent(CVisibilityGraph)) {
			const solutionViewGroup = entity.getComponent(CVisibilityGraph).solutionViewGroup;

			if (!solutionViewGroup) {
				return;
			}

			solutionViewGroup.forEach(solutionView => solutionView.removeFromParent());
		}
	});
};