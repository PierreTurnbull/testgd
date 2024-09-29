import { Player } from "@root/domains/player/characters/player.characters";
import { Monster1 } from "@root/domains/monster1/characters/monster.characters";

export type TGameEntities = {
	characters: {
		player: Player | null,
		monsters: Monster1[]
	}
}