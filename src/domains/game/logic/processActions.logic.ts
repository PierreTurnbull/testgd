import { Monster1 } from "@root/domains/monster1/characters/monster.characters";
import { game } from "../singletons/game.singletons";

export const processActions = (delta: number) => {
	if (game.player.isRunning) game.player.applyRunning(delta);
	game.monsters.forEach((monster: Monster1) => {
		if (monster.isRolling) monster.applyRolling(delta);
	});
};