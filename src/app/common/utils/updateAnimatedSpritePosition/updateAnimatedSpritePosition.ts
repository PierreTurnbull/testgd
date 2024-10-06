import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { AnimatedSprite, Graphics } from "pixi.js";

export const updateAnimatedSpritePosition = (
	animatedAnimatedSprite: AnimatedSprite | Graphics,
	coordinates: TCoordinates,
) => {
	animatedAnimatedSprite.x = coordinates.x - (animatedAnimatedSprite.width / 2);
	animatedAnimatedSprite.y = coordinates.y - (animatedAnimatedSprite.height / 2);
};