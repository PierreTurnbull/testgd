import { Archetype } from "@root/app/common/archetypes/archetype.models";
import { Component } from "@root/app/common/components/component.models";

/**
 * A list of archetypes that can be collided with when an entity moves.
 */
export class CMotionCollisionCandidates extends Component {
	constructor(motionCollisionCandidates: Archetype[]) {
		super();

		this.motionCollisionCandidates = motionCollisionCandidates;
	}

	motionCollisionCandidates: Archetype[];
}