import { CPlayer } from "@root/app/domains/player/components/user/user.component";
import { Archetype } from "../archetype.models";

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