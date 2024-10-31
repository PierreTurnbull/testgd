import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TOffset } from "@root/app/common/types/offset.types";
import { TPoint } from "@root/app/common/types/point.type";
import { appManager } from "@root/app/domains/app/appManager.singleton";
import { THitboxType } from "@root/app/domains/hitbox/types/hitbox.types";
import { Graphics } from "pixi.js";

/**
 * Initializes a hitbox border.
 */
export const initHitboxBorder = (
	name: string,
	type: THitboxType,
	coordinates: TCoordinates,
	offset: TOffset,
	bounds: TPoint[],
) => {

	const hitboxBorder = new Graphics();

	hitboxBorder.poly(bounds);

	let color: number | null = null;

	if (type === "damage") {
		color = 0xff0000;
	} else if (type === "motion") {
		color = 0xffff00;
	}

	if (!color) {
		throw new Error(`Missing color for type "${type}".`);
	}

	hitboxBorder
		.stroke({
			width:     2,
			color:     color,
			alignment: 1,
		});

	const label = `${name}.hitboxBorder`;
	hitboxBorder.label = label;
	
	hitboxBorder.x = coordinates.x + offset.x;
	hitboxBorder.y = coordinates.y + offset.y;

	appManager.app.stage.addChild(hitboxBorder);

	return hitboxBorder;
};