import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
import { CIsFindingPath } from "../components/isFindingPath.component";

/**
 * An entity that can seek a path to reach a target.
 */
export class APathfinder extends Archetype {
	constructor() {
		super([
			CVisibilityGraph,
			CIsFindingPath,
		]);
	}
}

export const pathfinderArchetype = new APathfinder();