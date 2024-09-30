import { setMonster1ActionFromKeyboard } from "@root/domains/monster1/logic/setMonster1ActionFromKeyboard.logic";
import { startPerformanceLap } from "@root/domains/performance/logic/startPerformanceLap.logic";
import { setPlayerActionFromKeyboard } from "@root/domains/player/logic/setPlayerActionFromKeyboard.logic";
import { Ticker } from "pixi.js";
import { game } from "../singletons/game.singletons";
import { processActions } from "./processActions.logic";

/**
 * The core game logic. Contains operations that are performed every frame.
 * @param delta 
 */
export const gameLoop = (delta: Ticker) => {
	startPerformanceLap();
	setPlayerActionFromKeyboard();
	game.monsters.forEach(monster => {
		setMonster1ActionFromKeyboard(monster);
	});
	processActions(delta);
};