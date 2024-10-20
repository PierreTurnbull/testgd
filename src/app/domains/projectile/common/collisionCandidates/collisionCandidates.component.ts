import { Archetype } from "@root/app/common/archetypes/archetype.models";
import { Component } from "@root/app/common/components/component.models";

/**
 * A list of archetypes that can be collided with.
 */
export class CCollisionCandidates extends Component {
	constructor(collisionCandidates: Archetype[]) {
		super();

		this.collisionCandidates = collisionCandidates;
	}

	collisionCandidates: Archetype[];
}