import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { Component } from "@root/app/ecs/components/models/component.models";

/**
 * A list of archetypes that can be collided with to apply damage.
 */
export class CDamageCollisionCandidates extends Component {
	constructor(damageCollisionCandidates: Archetype[]) {
		super();

		this.damageCollisionCandidates = damageCollisionCandidates;
	}

	damageCollisionCandidates: Archetype[];
}