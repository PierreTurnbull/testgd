import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CBorderView } from "../../components/border/border.component";
import { CCenterView } from "../../components/centerView/centerView.component";
import { CHitboxView } from "../../../domains/hitbox/components/hitboxView/hitboxView.component";
import { Entity } from "../../entities/entity.models";
import { TCoordinates } from "../../types/coordinates.types";
import { ENTITIES_CENTER_OFFSETS } from "../../views/constants/views.constants";
import { getOffsetCoordinates } from "../getOffsetCoordinates/getOffsetCoordinates";
import { trimDirection } from "../trimDirection/trimDirection";
import { updateViewContainerCoordinates } from "../updateViewContainerCoordinates/updateViewContainerCoordinates";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/domains/hitbox/components/hitboxOffset/hitboxOffset.component";
import { updateHitboxPosition } from "@root/app/domains/hitbox/utils/updateHitboxPosition";

/**
 * Applies next coordinates.
 */
export const applyNextCoordinates = (
	entity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const viewComponent = entity.getComponent(CView);
	const borderViewComponent = entity.getComponent(CBorderView);
	const locationComponent = entity.getComponent(CLocation);
	const centerViewComponent = entity.getComponent(CCenterView);

	// update coordinates

	locationComponent.coordinates = nextCoordinates;

	// update views

	const centerOffsets = ENTITIES_CENTER_OFFSETS[trimDirection(viewComponent.animatedSprite.label)];
	const offsetCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);

	updateViewContainerCoordinates(viewComponent.animatedSprite, offsetCoordinates);

	if (configManager.config.debug.showsEntityBorders) {
		updateViewContainerCoordinates(borderViewComponent.border, offsetCoordinates);
	}

	const hitboxEntities = entity.getRelatedEntities("hitboxes");
	hitboxEntities.forEach(hitboxEntity => {
		const hitboxComponent = hitboxEntity.getComponent(CHitbox);
		const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);

		const offsetCoordinates = getOffsetCoordinates(nextCoordinates, hitboxOffsetComponent.offset);

		updateHitboxPosition(hitboxComponent, offsetCoordinates);

		if (configManager.config.debug.showsEntityHitbox) {
			const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

			updateViewContainerCoordinates(hitboxViewComponent.hitboxBorder, offsetCoordinates);
		}
	});

	if (configManager.config.debug.showsEntityCenter && centerViewComponent.center) {
		updateViewContainerCoordinates(centerViewComponent.center, nextCoordinates);
	}
};