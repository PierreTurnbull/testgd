import { TPathfindingQueue } from "./types/pathfindingQueue.types";

/**
 * A queue to throttle pathfinding.
 */
class PathfindingQueue {
	constructor() {
	}

	queue: TPathfindingQueue = [];
}

export const pathfindingQueue = new PathfindingQueue();