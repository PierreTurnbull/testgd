import { startPerformanceLap } from "@root/domains/performance/logic/startPerformanceLap.logic";
import { game } from "../singletons/game.singletons";
import { setPlayerActionFromKeyboard } from "@root/domains/player/logic/setPlayerActionFromKeyboard.logic";

export const startGame = async () => {
	game.app.ticker.add((delta) => {
		startPerformanceLap();
		setPlayerActionFromKeyboard();
		// game.monsters.forEach(monster => {
		// 	if (monster instanceof Monster1) setMonster1ActionFromKeyboard(monster);
		// });
		// process(delta);
	});
};