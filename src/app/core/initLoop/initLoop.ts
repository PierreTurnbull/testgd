import { appManager } from "@root/app/common/app/appManager.singleton";
import { processActions } from "@root/app/common/systems/processActions/processActions.system";
import { translateInputs } from "@root/app/common/systems/translateInputs/translateInputs.system";
import { updateFps } from "@root/app/domains/fps/systems/updateFps/updateFps.system";
import { Ticker } from "pixi.js";

export const initLoop = () => {
	const loop = (delta: Ticker) => {
		translateInputs();
		processActions(delta);
		updateFps(delta);
	};

	appManager.app.ticker.add(loop);
};