import { CDamage } from "../../components/damage/damage.component";
import { Archetype } from "../archetype.models";

/**
 * Any entity that can die.
 */
export class ADamager extends Archetype {
	constructor() {
		super([
			CDamage,
		]);
	}
}

export const damagerArchetype = new ADamager();