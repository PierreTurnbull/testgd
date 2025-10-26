import { CDamage } from "../../components/common/damage.component";
import { Archetype } from "../models/archetype.models";

/**
 * Any entity that can deal some damage.
 */
export class ADamager extends Archetype {
	constructor() {
		super([
			CDamage,
		]);
	}
}

export const damagerArchetype = new ADamager();