import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CMuddyBuddy } from "@root/app/features/muddyBuddy/components/muddyBuddy/muddyBuddy.component";

export class AMuddyBuddy extends Archetype {
	constructor() {
		super([
			CMuddyBuddy,
		]);
	}
}

export const muddyBuddyArchetype = new AMuddyBuddy();