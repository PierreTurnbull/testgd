import { updateCamera } from "@root/app/core/utils/updateCamera/updateCamera";
import { processActions } from "@root/app/features/action/systems/processActions/processActions.system";
import { processAIs } from "@root/app/features/ai/utils/processAIs/processAIs";
import { applyDamageCollisions } from "@root/app/features/combat/systems/applyDamageCollisions/applyDamageCollisions";
import { updateFps } from "@root/app/features/fps/systems/updateFps/updateFps.system";
import { translateInputs } from "@root/app/features/input/systems/translateInputs/translateInputs.system";
import { sortViews } from "@root/app/features/view/systems/sortViews/sortViews.system";
import { Ticker } from "pixi.js";

export const runSystems = (delta: Ticker) => {
	translateInputs();
	processAIs();
	processActions(delta);
	applyDamageCollisions();
	sortViews();
	updateFps(delta);
	updateCamera();
};