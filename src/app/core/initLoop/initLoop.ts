import { appManager } from "@root/app/common/app/appManager.singleton";
import { processActions } from "@root/app/common/systems/processActions/processActions.system";
import { translateInputs } from "@root/app/common/systems/translateInputs/translateInputs.system";
import { Ticker } from "pixi.js";

export const initLoop = () => {
	const loop = (delta: Ticker) => {
		translateInputs();
		processActions(delta);
	};

	appManager.app.ticker.add(loop);
};