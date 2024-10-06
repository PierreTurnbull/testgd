import { appManager } from "@root/app/common/app/appManager.singleton";
import { processActions } from "@root/app/common/systems/processActions/processActions.system";
import { processAIs } from "@root/app/common/systems/processAIs/processAIs.system";
import { translateInputs } from "@root/app/common/systems/translateInputs/translateInputs.system";
import { updateFps } from "@root/app/domains/fps/systems/updateFps/updateFps.system";
import { Ticker } from "pixi.js";

export const initLoop = () => {
	const loop = (delta: Ticker) => {
		translateInputs();
		processAIs();
		processActions(delta);
		updateFps(delta);
	};

	appManager.app.ticker.add(loop);
};