import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TOffset } from "@root/app/common/types/offset.types";
import { TPoint } from "@root/app/common/types/point.type";
import { THitboxType } from "@root/app/domains/hitbox/types/hitbox.types";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";

/**
 * Initializes the view of a hitbox border.
 */
export const initHitboxBorderView = (
	name: string,
	type: THitboxType,
	coordinates: TCoordinates,
	offset: TOffset,
	bounds: TPoint[],
) => {

	const hitboxBorderView = new Graphics();

	hitboxBorderView.poly(bounds);

	let color: number | null = null;

	if (type === "damage") {
		color = 0xff0000;
	} else if (type === "motion") {
		color = 0xffff00;
	}

	if (!color) {
		throw new Error(`Missing color for type "${type}".`);
	}

	hitboxBorderView
		.stroke({
			width:     2,
			color:     color,
			alignment: 0.5,
		});

	const label = `${name}.hitboxBorder`;
	hitboxBorderView.label = label;
	
	hitboxBorderView.x = coordinates.x + offset.x;
	hitboxBorderView.y = coordinates.y + offset.y;

	worldManager.world.addChild(hitboxBorderView);

	return hitboxBorderView;
};