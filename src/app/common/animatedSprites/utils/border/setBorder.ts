import { appManager } from "@root/app/common/app/appManager.singleton";
import { CView } from "@root/app/common/components/view/view.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { Graphics } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/animatedSprites.constants";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";

/**
 * Creates a border 
 */
export const setBorder = (
	viewComponent: CView,
	coordinates: TCoordinates,
) => {
	const border = new Graphics()
		.rect(0, 0, viewComponent.animatedSprite.width, viewComponent.animatedSprite.height)
		.stroke({
			width:     2,
			color:     0xfeeb77,
			alignment: 1,
		});
	const label = `${viewComponent.animatedSprite.label}.border`;
	border.label = label;

	const centerOffset = ENTITIES_CENTER_OFFSETS[trimDirection(label)];
	border.x = coordinates.x + centerOffset.x;
	border.y = coordinates.y + centerOffset.y;
	appManager.app.stage.addChild(border);
	viewComponent.border = border;
};