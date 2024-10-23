import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CBorderView } from "../../components/border/border.component";
import { CCenterView } from "../../components/centerView/centerView.component";
import { CHitboxView } from "../../components/hitboxView/hitboxView.component";
import { Entity } from "../../entities/entity.models";
import { TCoordinates } from "../../types/coordinates.types";
import { ENTITIES_CENTER_OFFSETS } from "../../views/constants/views.constants";
import { getOffsetCoordinates } from "../getOffsetCoordinates/getOffsetCoordinates";
import { trimDirection } from "../trimDirection/trimDirection";
import { updateViewContainerCoordinates } from "../updateViewContainerCoordinates/updateViewContainerCoordinates";

/**
 * Applies next coordinates.
 */
export const applyNextCoordinates = (
	entity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const viewComponent = entity.getComponent(CView);
	const borderViewComponent = entity.getComponent(CBorderView);
	const hitboxViewComponent = entity.getComponent(CHitboxView);
	const locationComponent = entity.getComponent(CLocation);
	const centerViewComponent = entity.getComponent(CCenterView);

	// update coordinates

	locationComponent.coordinates = nextCoordinates;

	// update views

	const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(viewComponent.animatedSprite.label)];
	const centeredCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);

	updateViewContainerCoordinates(viewComponent.animatedSprite, centeredCoordinates);
	if (configManager.config.debug.showsEntityBorders) {
		updateViewContainerCoordinates(borderViewComponent.border, centeredCoordinates);
	}

	if (configManager.config.debug.showsEntityHitbox) {
		const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(hitboxViewComponent.hitboxBorder.label)];
		const centeredCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);
		updateViewContainerCoordinates(hitboxViewComponent.hitboxBorder, centeredCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter && centerViewComponent.center) {
		updateViewContainerCoordinates(centerViewComponent.center, nextCoordinates);
	}
};