import { Monster1 } from "@root/entities/characters/monster1/monster1.entity"
import { Player } from "@root/entities/characters/player/player.entity"
import { game } from "@root/game/game"

const initPlayer = () => {
	game.player = new Player({ coordinates: { x: 300, y: 300, } })
}

const initMonster1 = () => {
	game.monsters = [
		new Monster1({ coordinates: { x: 500, y: 500, } })
	]
}

export const initEntities = () => {
	initPlayer()
	initMonster1()
}