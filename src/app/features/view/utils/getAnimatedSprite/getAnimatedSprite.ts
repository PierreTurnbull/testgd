import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { CAction } from "@root/app/ecs/components/common/action.component";
import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { assetsManager } from "@root/app/features/assets/singletons/assetsManager.singleton";
import { ANIMATION_SPEEDS, ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { SCALE_FACTOR } from "@root/app/features/view/types/views.types";
import { AnimatedSprite } from "pixi.js";

export const getAnimatedSprite = (
	entity: Entity,
) => {
	const coordinates = entity.getComponent(CLocation).coordinates;
	const direction8 = entity.getComponent(CDirection).direction8;
	const action = entity.getComponent(CAction).currentAction;

	const name = `characters.${entity.name}.${action}.${direction8}`;
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

	return animatedSprite;
};