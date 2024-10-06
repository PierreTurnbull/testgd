import { appManager } from "@root/app/common/app/appManager.singleton";
import { CView } from "@root/app/common/components/view/view.entity";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { updateAnimatedSpritePosition } from "@root/app/common/utils/updateAnimatedSpritePosition/updateAnimatedSpritePosition";
import { Graphics } from "pixi.js";

export const setAnimatedSpriteBorder = (
	viewComponent: CView,
	coordinates: TCoordinates,
) => {
	const animatedSpriteBorder = new Graphics()
		.rect(0, 0, viewComponent.animatedSprite.width, viewComponent.animatedSprite.height)
		.stroke({
			width: 2,
			color: 0xfeeb77, 
		});
	updateAnimatedSpritePosition(animatedSpriteBorder, coordinates);
	appManager.app.stage.addChild(animatedSpriteBorder);
	viewComponent.animatedSpriteBorder = animatedSpriteBorder;
};