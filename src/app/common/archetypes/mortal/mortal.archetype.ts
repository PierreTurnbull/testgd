import { CHealth } from "../../components/health/health.component";
import { Archetype } from "../archetype.models";

/**
 * Any entity that can die.
 */
export class AMortal extends Archetype {
	constructor() {
		super([
			CHealth,
		]);
	}
}

export const mortalArchetype = new AMortal();