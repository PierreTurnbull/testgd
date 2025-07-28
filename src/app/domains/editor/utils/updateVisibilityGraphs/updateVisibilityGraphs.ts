import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { APathfinder } from "@root/app/common/archetypes/pathfinder/pathfinder.archetype";
import { createVisibilityGraph } from "@root/app/domains/pathfinding/utils/visibilityGraph/createVisibilityGraph/createVisibilityGraph";

/**
 * Updates the visibility graphs of all pathfinders.
 */
export const updateVisibilityGraphs = () => {
	const pathfinders = [...archetypeManager.getArchetype(APathfinder).entities];

	for (let i = 0; i < pathfinders.length; i++) {
		const pathfinder = pathfinders[i];

		createVisibilityGraph(pathfinder);
	}
};