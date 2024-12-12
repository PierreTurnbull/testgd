import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/domains/hitbox/components/hitboxOffset/hitboxOffset.component";
import { updateHitboxPosition } from "@root/app/domains/hitbox/utils/updateHitboxPosition";
import { CHitboxView } from "../../../domains/hitbox/components/hitboxView/hitboxView.component";
import { CBorderView } from "../../components/borderView/borderView.component";
import { CCenterView } from "../../components/centerView/centerView.component";
import { Entity } from "../../entities/entity.models";
import { TCoordinates } from "../../types/coordinates.types";
import { ENTITIES_CENTER_OFFSETS } from "../../views/constants/views.constants";
import { getOffsetCoordinates } from "../getOffsetCoordinates/getOffsetCoordinates";
import { updateViewContainerCoordinates } from "../updateViewContainerCoordinates/updateViewContainerCoordinates";
import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { CViewSortingCurveOffset } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";

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
	const viewSortingCurveViewComponent = entity.getComponent(CViewSortingCurveView);
	const viewSortingCurveOffsetComponent = entity.getComponent(CViewSortingCurveOffset);

	// update coordinates

	locationComponent.coordinates = nextCoordinates;

	// update views

	const centerOffsets = ENTITIES_CENTER_OFFSETS[viewComponent.view.label];
	const offsetCoordinates = getOffsetCoordinates(nextCoordinates, centerOffsets);

	updateViewContainerCoordinates(viewComponent.view, offsetCoordinates);

	if (configManager.config.debug.showsEntityBorders) {
		updateViewContainerCoordinates(borderViewComponent.borderView, offsetCoordinates);
	}

	const hitboxEntities = entity.getRelatedEntities("hitboxes");
	hitboxEntities.forEach(hitboxEntity => {
		const hitboxComponent = hitboxEntity.getComponent(CHitbox);
		const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);

		const offsetCoordinates = getOffsetCoordinates(nextCoordinates, hitboxOffsetComponent.offset);

		updateHitboxPosition(hitboxComponent, offsetCoordinates);

		if (configManager.config.debug.showsEntityHitboxes) {
			const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

			updateViewContainerCoordinates(hitboxViewComponent.hitboxBorderView, offsetCoordinates);
		}
	});

	if (configManager.config.debug.showsEntityCenters && centerViewComponent.centerView) {
		updateViewContainerCoordinates(centerViewComponent.centerView, nextCoordinates);
	}

	if (configManager.config.debug.showsViewSortingCurves && viewSortingCurveViewComponent.viewSortingCurveView) {
		const offsetCoordinates = getOffsetCoordinates(nextCoordinates, viewSortingCurveOffsetComponent.viewSortingCurveOffset);

		updateViewContainerCoordinates(viewSortingCurveViewComponent.viewSortingCurveView, offsetCoordinates);
	}
};