import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { AnimatedSprite } from "pixi.js";
import { appManager } from "../../app/appManager.singleton";
import { CView } from "../../components/view/view.entity";
import { updateAnimatedSpritePosition } from "../../systems/common/updateAnimatedSpritePosition/updateAnimatedSpritePosition";

export const replaceAnimatedSprite = (
	viewComponent: CView,
	prevAnimatedSprite: AnimatedSprite | null,
	newAnimatedSprite: AnimatedSprite,
	coordinates: TCoordinates,
) => {
	updateAnimatedSpritePosition(newAnimatedSprite, coordinates);
	newAnimatedSprite.play();
	newAnimatedSprite.currentFrame = 0;
	appManager.app.stage.addChild(newAnimatedSprite);
	viewComponent.animatedSprite = newAnimatedSprite;
	if (prevAnimatedSprite) {
		prevAnimatedSprite.removeFromParent();
	}
};