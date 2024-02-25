import { Monster1 } from "@root/entities/characters/monster1/monster1.entity"
import { Player } from "@root/entities/characters/player/player.entity"

export type TGame = {
	entities: {
		characters: {
			player: Player | null,
			monsters: Monster1[]
		}
	}
}