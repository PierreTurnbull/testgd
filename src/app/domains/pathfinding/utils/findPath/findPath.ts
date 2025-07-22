import { CIsFindingPath } from "@root/app/common/components/isFindingPath/isFindingPath.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CMemory } from "@root/app/domains/memory/components/memory/memory.component";
import { addStartAndEndToVisibilityGraph } from "./addStartAndEndToVisibilityGraph/addStartAndEndToVisibilityGraph";

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
	const memoryComponent = entity.getComponent(CMemory);
	const isFindingPathComponent = entity.getComponent(CIsFindingPath);

	const date = new Date();
	const offset = Math.random() * 100 + 100; // between 100 and 200 ms
	date.setTime(date.getTime() + offset);
	memoryComponent.addMemoryItem({
		type:           "didUpdatePath",
		nextUpdateDate: date,
	});
	const generatorObject = addStartAndEndToVisibilityGraph(
		entity,
		to,
		toArea,
	);

	isFindingPathComponent.time = performance.now();
	isFindingPathComponent.generatorObject = generatorObject;
	isFindingPathComponent.isFindingPath = true;

	generatorObject.next();
};