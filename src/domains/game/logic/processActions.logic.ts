import { Monster1 } from "@root/domains/monster1/characters/monster1.characters";
import { game } from "../singletons/game.singletons";
import { Ticker } from "pixi.js";

export const processActions = (delta: Ticker) => {
	if (game.player.isRunning) game.player.applyRunning(delta);
	game.monsters.forEach((monster: Monster1) => {
		if (monster.isRolling) monster.applyRolling(delta);
	});
};