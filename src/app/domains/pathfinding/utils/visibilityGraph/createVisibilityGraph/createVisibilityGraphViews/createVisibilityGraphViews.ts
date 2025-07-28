import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { Entity } from "@root/app/domains/entity/entity.models";
import { getExtendedHitboxPointViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getExtendedHitboxPointViewGroup/getExtendedHitboxPointViewGroup";
import { getExtendedHitboxViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getExtendedHitboxViewGroup/getExtendedHitboxViewGroup";
import { getFromLinkedNodeViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getFromLinkedNodeViewGroup/getFromLinkedNodeViewGroup";
import { getLinkedNodeViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getLinkedNodeViewGroup/getLinkedNodeViewGroup";
import { getVisibilityGraphNodeViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getNodeViewGroup/getNodeViewGroup";
import { getToAreaLinkedNodeViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getToAreaLinkedNodeViewGroup/getToAreaLinkedNodeViewGroup";
import { getToLinkedNodeViewGroup } from "@root/app/domains/pathfinding/utils/visibilityGraph/views/getToLinkedNodeViewGroup/getToLinkedNodeViewGroup";
import { createViewGroup } from "@root/app/domains/view/utils/create/createViewGroup/createViewGroup";
import { removeViewGroup } from "@root/app/domains/view/utils/remove/removeViewGroup/removeViewGroup";
import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";

/**
 * Creates views for the visibility graph.
 */
export const createVisibilityGraphViews = (
	entity: Entity,
) => {
	if (configManager.config.debug.showsExtendedHitboxes) {
		removeViewGroup(entity, CVisibilityGraph, "extendedHitboxPointViewGroup");
		removeViewGroup(entity, CVisibilityGraph, "extendedHitboxViewGroup");
		createViewGroup(entity, CVisibilityGraph, getExtendedHitboxPointViewGroup, "extendedHitboxPointViewGroup");
		createViewGroup(entity, CVisibilityGraph, getExtendedHitboxViewGroup, "extendedHitboxViewGroup");
	}

	if (configManager.config.debug.showsVisibilityGraphNodes) {
		createViewGroup(entity, CVisibilityGraph, getVisibilityGraphNodeViewGroup, "nodeViewGroup");
	}

	if (configManager.config.debug.showsVisibilityGraphNodeLinks) {
		removeViewGroup(entity, CVisibilityGraph, "linkedNodeViewGroup");
		removeViewGroup(entity, CVisibilityGraph, "fromLinkedNodeViewGroup");
		removeViewGroup(entity, CVisibilityGraph, "toLinkedNodeViewGroup");
		removeViewGroup(entity, CVisibilityGraph, "toAreaLinkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getLinkedNodeViewGroup, "linkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getFromLinkedNodeViewGroup, "fromLinkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getToLinkedNodeViewGroup, "toLinkedNodeViewGroup");
		createViewGroup(entity, CVisibilityGraph, getToAreaLinkedNodeViewGroup, "toAreaLinkedNodeViewGroup");
	}
};