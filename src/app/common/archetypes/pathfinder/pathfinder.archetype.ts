import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { Archetype } from "../archetype.models";
import { CIsFindingPath } from "../../components/isFindingPath/isFindingPath.component";

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