import { CMuddyBuddy } from "../../components/identity/muddyBuddy/muddyBuddy.component";
import { Archetype } from "../archetype.models";

export class AMuddyBuddy extends Archetype {
	constructor() {
		super([
			CMuddyBuddy,
		]);
	}
}

export const muddyBuddyArchetype = new AMuddyBuddy();