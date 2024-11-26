import { Archetype } from "@root/app/common/archetypes/archetype.models";
import { Component } from "@root/app/common/components/component.models";

/**
 * A list of archetypes that are taken into account when creating a visibility graph.
 */
export class CPathfindingCollisionCandidates extends Component {
	constructor(pathfindingCollisionCandidates: Archetype[]) {
		super();

		this.pathfindingCollisionCandidates = pathfindingCollisionCandidates;
	}

	pathfindingCollisionCandidates: Archetype[];
}