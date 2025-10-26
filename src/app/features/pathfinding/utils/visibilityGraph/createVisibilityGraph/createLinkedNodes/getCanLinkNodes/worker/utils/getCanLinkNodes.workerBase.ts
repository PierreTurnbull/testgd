import { TPairsToComputeEntries } from "@root/app/features/pathfinding/utils/findPath/addStartAndEndToVisibilityGraph/types/pairsToCompute.types";

self.onmessage = function (event) {
	const pairsToCompute: TPairsToComputeEntries = Object.entries(event.data.pairsToCompute);

	const linksResult: Record<string, boolean> = {};

	for (let i = 0; i < pairsToCompute.length; i++) {
		const pair = pairsToCompute[i];

		const key = pair[0];
		const value = pair[1];

		// @ts-expect-error: getCanLinkNodes will already be imported in the compiled worker
		const canLinkNodes = getCanLinkNodes(
			value.nodeA,
			value.nodeB,
			event.data.visibilityGraphComponent,
			event.data.rules,
		);

		linksResult[key] = canLinkNodes;
	}

	const message = {
		entityId:    event.data.entityId,
		linksResult: linksResult,
	};

	self.postMessage(message);
};