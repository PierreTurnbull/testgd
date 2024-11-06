import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { Sprite } from "pixi.js";

export const initSprite = (
	name: string,
	coordinates: TCoordinates,
) => {
	const sprite = new Sprite(assetsManager.textures[name]);

	sprite.x = coordinates.x - sprite.width / 2;
	sprite.y = coordinates.y - sprite.height / 2;
	sprite.width *= SCALE_FACTOR;
	sprite.height *= SCALE_FACTOR;
	worldManager.world.addChild(sprite);

	return sprite;
};