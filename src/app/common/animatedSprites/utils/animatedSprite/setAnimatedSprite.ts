import { appManager } from "@root/app/common/app/appManager.singleton";
import { CView } from "@root/app/common/components/view/view.component";
import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { AnimatedSprite } from "pixi.js";
import { ANIMATION_SPEEDS, ENTITIES_CENTER_OFFSETS } from "../../constants/animatedSprites.constants";

/**
 * Creates an animated sprite and adds it to the stage.
 */
export const setAnimatedSprite = (
	viewComponent: CView,
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
	if (name.includes("attacking")) {
		animatedSprite.loop = false;
	}

	const centerOffset = ENTITIES_CENTER_OFFSETS[allDirectionsName];
	animatedSprite.x = coordinates.x + centerOffset.x;
	animatedSprite.y = coordinates.y + centerOffset.y;
	appManager.app.stage.addChild(animatedSprite);
	viewComponent.animatedSprite = animatedSprite;
};