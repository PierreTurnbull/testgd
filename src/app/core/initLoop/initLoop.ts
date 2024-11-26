import { updateCamera } from "@root/app/common/utils/updateCamera/updateCamera";
import { orderViews } from "@root/app/core/systems/orderViews/orderViews.system";
import { processActions } from "@root/app/core/systems/processActions/processActions.system";
import { processAIs } from "@root/app/core/systems/processAIs/processAIs.system";
import { translateInputs } from "@root/app/core/systems/translateInputs/translateInputs.system";
import { appManager } from "@root/app/domains/app/appManager.singleton";
import { updateFps } from "@root/app/domains/fps/systems/updateFps/updateFps.system";
import { Ticker } from "pixi.js";
import { logDebug } from "../logDebug/logDebug";
import { applyDamageCollisions } from "../systems/applyDamageCollisions/applyDamageCollisions";

export const initLoop = () => {
	const loop = async (delta: Ticker) => {
		translateInputs();
		processAIs();
		processActions(delta);
		applyDamageCollisions();
		orderViews();
		updateFps(delta);
		updateCamera();
	};

	setInterval(logDebug, 1000);

	appManager.app.ticker.add(loop);
};