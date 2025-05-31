import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Graphics, ViewContainer } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../../constants/views.constants";

/**
 * Initializes the view of a border 
 */
export const initBorderView = (
	animatedSprite: ViewContainer,
	coordinates: TCoordinates,
) => {
	const borderView = new Graphics()
		.rect(0, 0, animatedSprite.width, animatedSprite.height)
		.stroke({
			width:     2,
			color:     0xaaaaaa,
			alignment: 0.5,
		});
	const label = `${animatedSprite.label}.border`;
	borderView.label = label;

	const centerOffset = ENTITIES_CENTER_OFFSETS[label];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${animatedSprite.label}".`);
	}
	borderView.x = coordinates.x + centerOffset.x;
	borderView.y = coordinates.y + centerOffset.y;

	worldManager.world.addChild(borderView);

	return borderView;
};