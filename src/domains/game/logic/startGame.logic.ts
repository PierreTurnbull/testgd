import { game } from "../singletons/game.singletons";
import { gameLoop } from "./gameLoop.logic";

export const startGame = async () => {
	game.app.ticker.add(gameLoop);
};