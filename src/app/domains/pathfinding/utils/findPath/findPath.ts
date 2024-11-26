import { Entity } from "@root/app/common/entities/entity.models";
import { CMemory } from "@root/app/common/memory/components/memory/memory.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { aStar } from "../common/aStar/aStar";
import { CVisibilityGraph } from "../../components/visibilityGraph/visibilityGraph.component";
import { addStartAndEndPointsToVisibilityGraph } from "./addStartAndEndPointsToVisibilityGraph/addStartAndEndPointsToVisibilityGraph";
import { createSolutionViews } from "./createSolutionViews/createSolutionViews";
import { unblockEntity } from "./unblockEntity/unblockEntity";
import { TPoint } from "@root/app/common/types/point.type";

export const logsFindPathPerformance = {
	findPath:      0,
	findPathCount: 0,
};

/**
 * Finds a path between two nodes using the A* algorithm.
 * This function requires the entity's visibility graph to be created first.
 */
export const findPath = (
	entity: Entity,
	to: TCoordinates,
	/**
	 * If provided, the destination is reached upon entering the area.
	 */
	toArea?: TPoint[],
) => {
	const start = performance.now();
	logsFindPathPerformance.findPathCount++;

	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);
	const memoryComponent = entity.getComponent(CMemory);

	addStartAndEndPointsToVisibilityGraph(entity, to, toArea);

	const solution = aStar(visibilityGraphComponent);

	visibilityGraphComponent.highlightedNodes = solution;
	createSolutionViews(entity, solution);

	if (!solution && visibilityGraphComponent.extendedHitboxesPointsSystem) {
		unblockEntity(entity);
	} else {
		const date = new Date();
		const offset = Math.random() * 100 + 100; // between 100 and 200 ms
		date.setTime(date.getTime() + offset);
		memoryComponent.addMemoryItem({
			type:           "didUpdatePath",
			nextUpdateDate: date,
		});
	}

	const end = performance.now();
	logsFindPathPerformance.findPath += end - start;
};