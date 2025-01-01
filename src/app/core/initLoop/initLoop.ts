import { hitboxArchetype } from "@root/app/common/archetypes/hitbox/hitbox.archetype";
import { updateCamera } from "@root/app/common/utils/updateCamera/updateCamera";
import { processActions } from "@root/app/core/systems/processActions/processActions.system";
import { processAIs } from "@root/app/core/systems/processAIs/processAIs.system";
import { translateInputs } from "@root/app/core/systems/translateInputs/translateInputs.system";
import { appManager } from "@root/app/domains/app/appManager.singleton";
import { updateFps } from "@root/app/domains/fps/systems/updateFps/updateFps.system";
import { Ticker } from "pixi.js";
import { logDebug } from "../logDebug/logDebug";
import { applyDamageCollisions } from "../systems/applyDamageCollisions/applyDamageCollisions";
import { sortViews } from "../systems/sortViews/sortViews.system";

export const aaa = [];
export const initLoop = () => {
	const loop = async (delta: Ticker) => {
		translateInputs();
		processAIs();
		processActions(delta);
		applyDamageCollisions();
		sortViews();
		updateFps(delta);
		updateCamera();
		aaa.push({
			t: new Date(),
			e: [...hitboxArchetype.entities],
			l: [...hitboxArchetype.entities].length,
		});
	};

	setInterval(logDebug, 1000);

	appManager.app.ticker.add(loop);
};