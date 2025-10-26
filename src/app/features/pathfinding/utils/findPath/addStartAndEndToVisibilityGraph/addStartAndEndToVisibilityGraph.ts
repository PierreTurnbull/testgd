import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { CIsFindingPath } from "@root/app/features/pathfinding/components/isFindingPath.component";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
import { getCanLinkNodesWorker } from "../../visibilityGraph/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/utils/getCanLinkNodes.worker";
import { getMessage } from "./getMessage/getMessage";
import { getNodeBases } from "./getNodeBases/getNodeBases";
import { getPairsToCompute } from "./getPairsToCompute/getPairsToCompute";
import { makeLinks } from "./makeLinks/makeLinks";
import { resetStartAndEndLinks } from "./resetStartAndEndLinks/resetStartAndEndLinks";
import { updateStartAndEndViews } from "./updateStartAndEndViews/updateStartAndEndViews";

/**
 * Adds nodes and node links to the entity's visibility graph corresponding to the entity's position and its destination.
 */
export function* addStartAndEndToVisibilityGraph(
	entity: Entity,
	to: TCoordinates,
	/**
	 * If provided, the destination is reached upon entering the area.
	 */
	toArea?: TPoint[],
) {
	const generatorObject = entity.getComponent(CIsFindingPath).generatorObject;

	if (!generatorObject) {
		throw new Error("Missing generator object.");
	}

	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);
	const locationComponent = entity.getComponent(CLocation);

	const {
		fromNode,
		toNode,
		toAreaNodes,
	} = getNodeBases(locationComponent.coordinates, to, toArea);
	resetStartAndEndLinks(visibilityGraphComponent);

	const nodesWithEntity = structuredClone(visibilityGraphComponent.nodes);

	const pairsToCompute = getPairsToCompute(nodesWithEntity, fromNode, toNode, toAreaNodes);

	const message = getMessage(pairsToCompute, visibilityGraphComponent, entity.id);

	getCanLinkNodesWorker.postMessage(message);

	const linksResult: Record<string, boolean> = yield;

	makeLinks(
		visibilityGraphComponent,
		nodesWithEntity,
		linksResult,
		fromNode,
		toNode,
		toAreaNodes,
	);
	updateStartAndEndViews(entity);

	return {
		fromNode: fromNode,
		toNode:   toNode,
	};
};