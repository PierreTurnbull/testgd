import { appManager } from "@root/app/common/app/appManager.singleton";
import { CView } from "@root/app/common/components/view/view.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { getOffsetCoordinates } from "@root/app/common/utils/getOffsetCoordinates/getOffsetCoordinates";
import { animatedSpritesManager } from "@root/app/core/animatedSpritesManager/animatedSpritesManager.singletons";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/animatedSprites.constants";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";

/**
 * Creates an animated sprite and adds it to the stage.
 */
export const setAnimatedSprite = (
	viewComponent: CView,
	animatedSpriteName: string,
	coordinates: TCoordinates,
) => {
	const animatedSprite = animatedSpritesManager.animatedSprites[animatedSpriteName];
	animatedSprite.play();
	animatedSprite.currentFrame = 0;
	const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(animatedSpriteName)];
	const centeredCoordinates = getOffsetCoordinates(coordinates, centerOffsets);
	updateViewContainerCoordinates(animatedSprite, centeredCoordinates);
	appManager.app.stage.addChild(animatedSprite);
	viewComponent.animatedSprite = animatedSprite;
};