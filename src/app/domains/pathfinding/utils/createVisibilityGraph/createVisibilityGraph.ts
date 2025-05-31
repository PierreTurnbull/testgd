import { Entity } from "@root/app/domains/entity/entity.models";
import { CVisibilityGraph } from "../../components/visibilityGraph/visibilityGraph.component";
import { createExtendedHitboxesPoints } from "./createExtendedHitboxesPoints/createExtendedHitboxesPoints";
import { createLinkedNodes } from "./createLinkedNodes/createLinkedNodes";
import { createNodes } from "./createNodes/createNodes";
import { createShapesSegments } from "./createShapesSegments/createShapesSegments";
import { createVisibilityGraphViews } from "./createVisibilityGraphViews/createVisibilityGraphViews";
import { resetVisibilityGraph } from "./resetVisibilityGraph/resetVisibilityGraph";

/**
 * Creates a visibility graph for the entity, which can be used as many times as needed
 * to find paths using a pathfinding algorithm as long as obstacles don't change.
 */
export const createVisibilityGraph = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	// reset the graph
	resetVisibilityGraph(visibilityGraphComponent);

	// generate the graph's materials
	createExtendedHitboxesPoints(entity); // points from colliders' hitboxes
	createNodes(visibilityGraphComponent); // graph nodes from points
	createShapesSegments(visibilityGraphComponent); // shape segments from nodes

	// create links between nodes
	createLinkedNodes(visibilityGraphComponent);

	// create the visibility graph's views (debug only)
	createVisibilityGraphViews(visibilityGraphComponent);
};