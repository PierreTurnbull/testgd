import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { Component } from "@root/app/ecs/components/models/component.models";

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