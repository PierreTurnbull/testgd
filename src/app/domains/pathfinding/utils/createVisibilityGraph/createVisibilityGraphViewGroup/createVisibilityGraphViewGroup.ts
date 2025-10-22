import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { Entity } from "@root/app/domains/entity/entity.models";
import { getExtendedHitboxPointViewGroup } from "@root/app/domains/view/extendedHitbox/utils/getExtendedHitboxPointViewGroup/getExtendedHitboxPointViewGroup";
import { getExtendedHitboxViewGroup } from "@root/app/domains/view/extendedHitbox/utils/getExtendedHitboxViewGroup/getExtendedHitboxViewGroup";
import { createViewGroup } from "@root/app/domains/view/utils/createViewGroup/createViewGroup";
import { removeViewGroup } from "@root/app/domains/view/utils/removeViewGroup/removeViewGroup";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { createNodeLinkViewGroup } from "./createNodeLinkViewGroup/createNodeLinkViewGroup";
import { createExtendedHitboxViewGroup } from "./createNodeViewGroup/createNodeViewGroup";

/**
 * Creates views for the visibility graph.
 */
export const createVisibilityGraphViewGroup = (
	entity: Entity,
) => {
	// if (configManager.config.debug.showsVisibilityGraphNodeLinks) {
	// 	removeViewGroup(entity, CVisibilityGraph, "extendedHitboxViewGroup");
	// 	createViewGroup(entity, CVisibilityGraph, getExtendedHitboxViewGroup, "extendedHitboxViewGroup");
	// }

	// if (configManager.config.debug.showsVisibilityGraphNodes) {
	// 	removeViewGroup(entity, CVisibilityGraph, "extendedHitboxPointViewGroup");
	// 	createViewGroup(entity, CVisibilityGraph, getExtendedHitboxPointViewGroup, "extendedHitboxPointViewGroup");
	// }

	// removeViewGroup(entity, CVisibilityGraph, "linkedNodeViewGroup");
	// createViewGroup(entity, CVisibilityGraph, getLinkedNodeViewGroup, "linkedNodeViewGroup");
};