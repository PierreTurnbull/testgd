import { appManager } from "@root/app/common/app/appManager.singleton";
import { CView } from "@root/app/common/components/view/view.entity";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { updateAnimatedSpritePosition } from "@root/app/common/utils/updateAnimatedSpritePosition/updateAnimatedSpritePosition";
import { AnimatedSprite } from "pixi.js";

export const setAnimatedSprite = (
	viewComponent: CView,
	animatedSprite: AnimatedSprite,
	coordinates: TCoordinates,
) => {
	animatedSprite.play();
	animatedSprite.currentFrame = 0;
	updateAnimatedSpritePosition(animatedSprite, coordinates);
	appManager.app.stage.addChild(animatedSprite);
	viewComponent.animatedSprite = animatedSprite;
};