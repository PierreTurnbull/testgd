import { Monster1 } from "@root/entities/characters/monster1/monster1.entity"
import { game } from "@root/game/game"

export const process = (delta: number) => {
	if (game.player.isRunning) game.player.applyRunning(delta)
	game.monsters.forEach((monster: Monster1) => {
		if (monster.isRolling) monster.applyRolling(delta)
	})
}