import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { configManager } from "@root/app/features/config/singletons/configManager.singleton";
import { CHitboxView } from "@root/app/features/hitbox/components/hitboxView/hitboxView.component";
import { CBorderView } from "@root/app/features/view/components/borderView.component";
import { CCenterView } from "@root/app/features/view/components/centerView.component";
import { CView } from "@root/app/features/view/components/view.component";
import { DEBUG_VIEW_Z_OFFSET } from "@root/app/features/view/constants/sortViews.constants";
import { CViewSortingCurveView } from "@root/app/features/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";

/**
 * Reorder entity views in order.
 */
export const sortViewsFromEntities = (
	sortedViewEntities: Entity[],
) => {
	sortedViewEntities.forEach((sortedViewEntity, key) => {
		sortedViewEntity.getComponent(CView).view.zIndex = key;

		if (sortedViewEntity.hasComponent(CBorderView) && configManager.config.debug.showsEntityBorders) {
			const borderViewComponent = sortedViewEntity.getComponent(CBorderView);

			borderViewComponent.borderView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
		}

		if (sortedViewEntity.hasComponent(CCenterView) && configManager.config.debug.showsEntityCenters) {
			const centerViewComponent = sortedViewEntity.getComponent(CCenterView);

			centerViewComponent.centerView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
		}

		if (sortedViewEntity.hasComponent(CViewSortingCurveView) && configManager.config.debug.showsViewSortingCurves) {
			const viewSortingCurveViewComponent = sortedViewEntity.getComponent(CViewSortingCurveView);

			if (viewSortingCurveViewComponent.viewSortingCurveView) {
				viewSortingCurveViewComponent.viewSortingCurveView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
			}
		}

		if (sortedViewEntity.relations.has("hitboxes")) {
			const hitboxEntities = sortedViewEntity.getRelatedEntities("hitboxes");

			hitboxEntities.forEach(hitboxEntity => {
				if (hitboxEntity.hasComponent(CHitboxView) && configManager.config.debug.showsEntityHitboxes) {
					const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

					hitboxViewComponent.hitboxBorderView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
				}
			});
		}
	});
};