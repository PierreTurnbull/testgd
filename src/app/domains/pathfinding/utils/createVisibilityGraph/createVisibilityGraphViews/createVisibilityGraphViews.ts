import { CVisibilityGraph } from "../../../components/visibilityGraph.component";
import { createExtendedHitboxViews } from "./createExtendedHitboxViews/createExtendedHitboxViews";
import { createNodeLinkViews } from "./createNodeLinkViews/createNodeLinkViews";
import { createNodeViews } from "./createNodeViews/createNodeViews";

/**
 * Creates views for the visibility graph.
 */
export const createVisibilityGraphViews = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	createExtendedHitboxViews(visibilityGraphComponent);
	createNodeViews(visibilityGraphComponent);
	createNodeLinkViews(visibilityGraphComponent);
};