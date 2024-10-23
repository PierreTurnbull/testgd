import { applyProjectileCollisions } from "@root/app/common/systems/applyProjectileCollisions/applyProjectileCollisions.system";
import { orderViews } from "@root/app/common/systems/orderViews/orderViews.system";
import { processActions } from "@root/app/common/systems/processActions/processActions.system";
import { processAIs } from "@root/app/common/systems/processAIs/processAIs.system";
import { translateInputs } from "@root/app/common/systems/translateInputs/translateInputs.system";
import { appManager } from "@root/app/domains/app/appManager.singleton";
import { updateFps } from "@root/app/domains/fps/systems/updateFps/updateFps.system";
import { Ticker } from "pixi.js";

export const initLoop = () => {
	const loop = (delta: Ticker) => {
		translateInputs();
		processAIs();
		processActions(delta);
		applyProjectileCollisions();
		orderViews();
		updateFps(delta);
	};

	appManager.app.ticker.add(loop);
};