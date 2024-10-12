import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { ENTITIES_CENTER_OFFSETS } from "../../animatedSprites/constants/animatedSprites.constants";
import { CHitboxView } from "../../components/hitboxView/hitboxView.component";
import { TCoordinates } from "../../types/coordinates.types";
import { getOffsetCoordinates } from "../getOffsetCoordinates/getOffsetCoordinates";
import { trimDirection } from "../trimDirection/trimDirection";
import { updateViewContainerCoordinates } from "../updateViewContainerCoordinates/updateViewContainerCoordinates";

/**
 * Applies next coordinates.
 */
export const applyNextCoordinates = (
	nextCoordinates: TCoordinates,
	viewComponent: CView,
	locationComponent: CLocation,
	hitboxViewComponent: CHitboxView,
) => {
	locationComponent.coordinates = nextCoordinates;
	const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(viewComponent.animatedSprite.label)];
	const centeredCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);

	updateViewContainerCoordinates(viewComponent.animatedSprite, centeredCoordinates);
	if (configManager.config.debug.showsEntityBorders) {
		updateViewContainerCoordinates(viewComponent.border, centeredCoordinates);
	}

	if (configManager.config.debug.showsEntityHitboxes) {
		const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(hitboxViewComponent.hitboxBorder.label)];
		const centeredCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);
		updateViewContainerCoordinates(hitboxViewComponent.hitboxBorder, centeredCoordinates);
	}
};