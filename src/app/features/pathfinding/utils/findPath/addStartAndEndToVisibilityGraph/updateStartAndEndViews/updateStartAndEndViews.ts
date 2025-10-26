import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { configManager } from "@root/app/features/config/singletons/configManager.singleton";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
import { getFromLinkedNodeViewGroup } from "@root/app/features/pathfinding/utils/visibilityGraph/views/getFromLinkedNodeViewGroup/getFromLinkedNodeViewGroup";
import { getToAreaLinkedNodeViewGroup } from "@root/app/features/pathfinding/utils/visibilityGraph/views/getToAreaLinkedNodeViewGroup/getToAreaLinkedNodeViewGroup";
import { getToLinkedNodeViewGroup } from "@root/app/features/pathfinding/utils/visibilityGraph/views/getToLinkedNodeViewGroup/getToLinkedNodeViewGroup";
import { createViewGroup } from "@root/app/features/view/utils/create/createViewGroup/createViewGroup";
import { removeViewGroup } from "@root/app/features/view/utils/remove/removeViewGroup/removeViewGroup";

/**
 * Update the node link views related to start and end of the graph.
 * Do not update the views of other links, because they haven't changed.
 */
export const updateStartAndEndViews = (
	entity: Entity,
) => {
	if (configManager.config.debug.showsVisibilityGraphNodeLinks) {
		removeViewGroup(entity, CVisibilityGraph, "fromLinkedNodeViewGroup");
		removeViewGroup(entity, CVisibilityGraph, "toLinkedNodeViewGroup");
		removeViewGroup(entity, CVisibilityGraph, "toAreaLinkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getFromLinkedNodeViewGroup, "fromLinkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getToLinkedNodeViewGroup, "toLinkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getToAreaLinkedNodeViewGroup, "toAreaLinkedNodeViewGroup");
	}
};