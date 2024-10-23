import { appManager } from "@root/app/domains/app/appManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { Graphics } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/views.constants";

export const initHitboxBorder = (
	hitboxName: string,
	bounds: TPoint[],
	coordinates: TCoordinates,
) => {
	const hitboxBorder = new Graphics();

	hitboxBorder.poly(bounds);

	hitboxBorder
		.stroke({
			width:     2,
			color:     0xfe7777,
			alignment: 1,
		});

	const label = `${hitboxName}.hitboxBorder`;
	hitboxBorder.label = label;
	
	const centerOffset = ENTITIES_CENTER_OFFSETS[label];
	hitboxBorder.x = coordinates.x + centerOffset.x;
	hitboxBorder.y = coordinates.y + centerOffset.y;
	appManager.app.stage.addChild(hitboxBorder);

	return hitboxBorder;
};