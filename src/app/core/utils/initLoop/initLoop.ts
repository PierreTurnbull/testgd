import { runSystems } from "@root/app/ecs/systems/utils/runSystems";
import { appManager } from "@root/app/features/app/appManager.singleton";
import { Ticker } from "pixi.js";

export const initLoop = () => {
	const loop = async (delta: Ticker) => {
		runSystems(delta);
	};

	appManager.app.ticker.add(loop);
};