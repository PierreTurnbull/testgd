import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { data } from "@root/app/domains/editor/data/data";
import { createRockLG } from "@root/app/domains/rockLG/utils/createRockLG";
import { createRockMD } from "@root/app/domains/rockMD/utils/createRockMD";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Sprite } from "pixi.js";

export const initEnvironment = () => {
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const name = "environment.dirt." + Math.floor(Math.random() * 10);
		
			const sprite = new Sprite(assetsManager.textures[name]);
		
			sprite.label = name;
			sprite.width *= SCALE_FACTOR;
			sprite.height *= SCALE_FACTOR;
		
			const centerOffset = ENTITIES_CENTER_OFFSETS[name];
			if (!centerOffset) {
				throw new Error(`Missing center offsets for "${name}".`);
			}

			sprite.x = j * 256 * 3;
			sprite.y = i * 256 * 3;

			worldManager.world.addChild(sprite);
		}
	}

	data.items.environment.forEach(environment => {
		if (environment.name === "rockLG") {
			createRockLG(
				environment.coordinates,
				environment.variant,
				environment.direction8,
				environment.gameEditorId,
			);
		}
		if (environment.name === "rockMD") {
			createRockMD(
				environment.coordinates,
				environment.variant,
				environment.direction8,
				environment.gameEditorId,
			);
		}
	});
};