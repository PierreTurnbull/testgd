import { Entity } from "@root/app/common/entities/entity.models";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";

/**
 * All the informations required to do a pathfinding.
 */
export type TPathfindingQueueItem = {
	entity: Entity
	to:     TCoordinates
	toArea: TPoint[]
}

/**
 * A queue of pathfinding items containing all the informations required to do a pathfinding.
 */
export type TPathfindingQueue = TPathfindingQueueItem[]