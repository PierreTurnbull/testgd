import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { Sprite } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/views.constants";

export const initSprite = (
	name: string,
	coordinates: TCoordinates,
) => {
	const sprite = new Sprite(assetsManager.textures[name]);

	sprite.label = name;
	sprite.width *= SCALE_FACTOR;
	sprite.height *= SCALE_FACTOR;

	const centerOffset = ENTITIES_CENTER_OFFSETS[name];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${name}".`);
	}
	sprite.x = coordinates.x + centerOffset.x;
	sprite.y = coordinates.y + centerOffset.y;
	worldManager.world.addChild(sprite);

	return sprite;
};