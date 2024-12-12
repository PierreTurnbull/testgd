import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { AnimatedSprite } from "pixi.js";
import { ANIMATION_SPEEDS, ENTITIES_CENTER_OFFSETS } from "../../constants/views.constants";

/**
 * Initializes an animated sprite.
 */
export const initAnimatedSprite = (
	name: string,
	coordinates: TCoordinates,
) => {
	const allDirectionsName = trimDirection(name);

	const spritesheet = assetsManager.spritesheets[name];
	const animatedSprite = new AnimatedSprite(spritesheet.animations[name]);

	animatedSprite.width *= SCALE_FACTOR;
	animatedSprite.height *= SCALE_FACTOR;
	animatedSprite.play();
	const animationSpeed = ANIMATION_SPEEDS[allDirectionsName];
	if (!animationSpeed) throw new Error(`Missing animation speed for ${allDirectionsName}.`);
	animatedSprite.animationSpeed = animationSpeed;
	animatedSprite.label = name;
	if (
		name.includes("attacking") ||
		name.includes("dying") ||
		name.includes("beingDead") ||
		name.includes("beingHit")
	) {
		animatedSprite.loop = false;
	}

	const centerOffset = ENTITIES_CENTER_OFFSETS[name];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${allDirectionsName}".`);
	}
	animatedSprite.x = coordinates.x + centerOffset.x;
	animatedSprite.y = coordinates.y + centerOffset.y;
	worldManager.world.addChild(animatedSprite);

	return animatedSprite;
};