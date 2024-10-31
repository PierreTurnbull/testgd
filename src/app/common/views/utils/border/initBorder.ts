import { appManager } from "@root/app/domains/app/appManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { AnimatedSprite, Graphics } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/views.constants";

/**
 * Initializes a border 
 */
export const initBorder = (
	animatedSprite: AnimatedSprite,
	coordinates: TCoordinates,
) => {
	const border = new Graphics()
		.rect(0, 0, animatedSprite.width, animatedSprite.height)
		.stroke({
			width:     2,
			color:     0xaaaaaa,
			alignment: 1,
		});
	const label = `${animatedSprite.label}.border`;
	border.label = label;

	const centerOffset = ENTITIES_CENTER_OFFSETS[trimDirection(label)];
	border.x = coordinates.x + centerOffset.x;
	border.y = coordinates.y + centerOffset.y;
	appManager.app.stage.addChild(border);

	return border;
};