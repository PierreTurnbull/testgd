import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { configManager } from "@root/app/features/config/singletons/configManager.singleton";
import { CHitbox } from "@root/app/features/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/features/hitbox/components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "@root/app/features/hitbox/components/hitboxView/hitboxView.component";
import { updateHitboxPosition } from "@root/app/features/hitbox/utils/updateHitboxPosition";
import { CBorderView } from "@root/app/features/view/components/borderView.component";
import { CCenterView } from "@root/app/features/view/components/centerView.component";
import { CView } from "@root/app/features/view/components/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { CViewSortingCurveView } from "@root/app/features/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { TCoordinates } from "../../../math/types/coordinates.types";
import { getOffsetCoordinates } from "../../../math/utils/getOffsetCoordinates/getOffsetCoordinates";

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

	// update coordinates

	locationComponent.coordinates = nextCoordinates;

	// update views

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewComponent.view.label];
	const offsetCoordinates = getOffsetCoordinates(nextCoordinates, centerOffset);

	viewComponent.view.x = offsetCoordinates.x;
	viewComponent.view.y = offsetCoordinates.y;

	if (configManager.config.debug.showsEntityBorders) {
		borderViewComponent.borderView.x = offsetCoordinates.x;
		borderViewComponent.borderView.y = offsetCoordinates.y;
	}

	const hitboxEntities = entity.getRelatedEntities("hitboxes");
	hitboxEntities.forEach(hitboxEntity => {
		const hitboxComponent = hitboxEntity.getComponent(CHitbox);
		const hitboxLocationComponent = hitboxEntity.getComponent(CLocation);
		const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);

		const offsetCoordinates = getOffsetCoordinates(nextCoordinates, hitboxOffsetComponent.offset);

		updateHitboxPosition(hitboxComponent, offsetCoordinates);
		hitboxLocationComponent.coordinates = locationComponent.coordinates;

		if (configManager.config.debug.showsEntityHitboxes) {
			const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

			hitboxViewComponent.hitboxBorderView.x = offsetCoordinates.x;
			hitboxViewComponent.hitboxBorderView.y = offsetCoordinates.y;
		}
	});

	if (configManager.config.debug.showsEntityCenters && centerViewComponent.centerView) {
		centerViewComponent.centerView.x = nextCoordinates.x;
		centerViewComponent.centerView.y = nextCoordinates.y;
	}

	if (configManager.config.debug.showsViewSortingCurves && viewSortingCurveViewComponent.viewSortingCurveView) {
		const centerOffset = ENTITIES_CENTER_OFFSETS[viewComponent.view.label];
		const offsetCoordinates = getOffsetCoordinates(nextCoordinates, centerOffset);

		viewSortingCurveViewComponent.viewSortingCurveView.x = offsetCoordinates.x;
		viewSortingCurveViewComponent.viewSortingCurveView.y = offsetCoordinates.y;
	}
};