import { appManager } from "@root/app/common/app/appManager.singleton";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { Graphics } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/animatedSprites.constants";

export const setHitboxBorder = (
	viewComponent: CHitboxView,
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
	viewComponent.hitboxBorder = hitboxBorder;
};