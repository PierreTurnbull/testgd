import { startPerformanceLap } from "@root/domains/performance/logic/startPerformanceLap.logic";
import { setPlayerActionFromKeyboard } from "@root/domains/player/logic/setPlayerActionFromKeyboard.logic";
import { Ticker } from "pixi.js";

/**
 * The core game logic. Contains operations that are performed every frame.
 * @param delta 
 */
export const gameLoop = (delta: Ticker) => {
	startPerformanceLap();
	setPlayerActionFromKeyboard();
	// game.monsters.forEach(monster => {
	// 	if (monster instanceof Monster1) setMonster1ActionFromKeyboard(monster);
	// });
	// process(delta);
};