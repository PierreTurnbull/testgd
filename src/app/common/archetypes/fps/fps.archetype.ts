import { CFps } from "@root/app/domains/fps/components/fps/fps.component";
import { Archetype } from "../archetype.models";

/**
 * The character controlled by the player.
 */
export class AFps extends Archetype {
	constructor() {
		super([
			CFps,
		]);
	}
}

export const fpsArchetype = new AFps();