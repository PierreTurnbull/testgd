import { CHealth } from "../../components/common/health.component";
import { Archetype } from "../models/archetype.models";

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