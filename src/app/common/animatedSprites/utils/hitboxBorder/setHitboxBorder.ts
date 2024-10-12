import { appManager } from "@root/app/common/app/appManager.singleton";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TDimensions } from "@root/app/common/types/dimensions.types";
import { getOffsetCoordinates } from "@root/app/common/utils/getOffsetCoordinates/getOffsetCoordinates";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";
import { Graphics } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/animatedSprites.constants";

export const setHitboxBorder = (
	viewComponent: CHitboxView,
	hitboxName: string,
	dimensions: TDimensions,
	coordinates: TCoordinates,
) => {
	const hitboxBorder = new Graphics()
		.rect(0, 0, dimensions.w, dimensions.h)
		.stroke({
			width: 2,
			color: 0xfe7777,
			alignment: 1,
		});
	const label = `${hitboxName}.hitboxBorder`;
	hitboxBorder.label = label;
	const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(label)];
	const centeredCoordinates = getOffsetCoordinates(coordinates, centerOffsets);
	updateViewContainerCoordinates(hitboxBorder, centeredCoordinates);
	appManager.app.stage.addChild(hitboxBorder);
	viewComponent.hitboxBorder = hitboxBorder;
};