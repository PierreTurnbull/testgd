import { CIsFindingPath } from "@root/app/common/components/isFindingPath/isFindingPath.component";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";
import { aStar } from "@root/app/domains/pathfinding/utils/aStar/aStar";
import { processSolution } from "@root/app/domains/pathfinding/utils/findPath/processSolution/processSolution";

export const getCanLinkNodesWorker = new Worker(
	new URL("../compiled/getCanLinkNodes.worker.js", import.meta.url),
	{ type: "module" },
);

getCanLinkNodesWorker.addEventListener("message", event => {
	const entity = entityManager.entitiesById.get(event.data.entityId);

	if (!entity) {
		return;
	}

	const isFindingPathComponent = entity.getComponent(CIsFindingPath);

	if (!isFindingPathComponent.generatorObject) {
		throw new Error("Missing generator object.");
	}

	const result = isFindingPathComponent.generatorObject.next(event.data.linksResult);

	if (result.done) {
		isFindingPathComponent.generatorObject = null;
		isFindingPathComponent.isFindingPath = false;

		const fromNode: TVisibilityGraphNode = result.value.fromNode;
		const toNode: TVisibilityGraphNode = result.value.toNode;

		const solution = aStar(fromNode, toNode);

		processSolution(event.data.entityId, solution);
	}
});