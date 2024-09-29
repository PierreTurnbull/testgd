import { initApplication } from "./initApplication.logic";
import { initGame } from "./initGame.logic";
import { startGame } from "../startGame.logic";

export const init = async () => {
	await initApplication();
	await initGame();
	startGame();
};