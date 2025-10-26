import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CFps } from "@root/app/features/fps/components/fps/fps.component";

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