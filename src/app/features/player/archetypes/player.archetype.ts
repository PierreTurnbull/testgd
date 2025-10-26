import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CPlayer } from "@root/app/features/player/components/user/user.component";

/**
 * The character controlled by the player.
 */
export class APlayer extends Archetype {
	constructor() {
		super([
			CPlayer,
		]);
	}
}

export const playerArchetype = new APlayer();