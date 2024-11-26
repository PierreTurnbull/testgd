import { CBorderView } from "@root/app/common/components/border/border.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { sortableViewArchetype } from "../../../common/archetypes/sortableView/sortableView.archetype";
import { CView } from "../../../common/components/view/view.component";
import { configManager } from "../../configManager/configManager.singletons";
import { DEBUG_VIEW_Z_OFFSET } from "./constants/orderViews.constants";

/**
 * Updates the order in which views are rendered.
 * This makes items that are "further" appear behind items that are "closer".
 */
export const orderViews = () => {
	const sortableViewEntities = [...sortableViewArchetype.entities];

	const orderedViewEntities = sortableViewEntities.sort((a, b) => {
		const aLocation = a.getComponent(CLocation);
		const bLocation = b.getComponent(CLocation);

		if (aLocation.coordinates.y > bLocation.coordinates.y) return 1;
		if (aLocation.coordinates.y < bLocation.coordinates.y) return -1;
		return 0;
	});

	orderedViewEntities.forEach((orderedViewEntity, key) => {
		orderedViewEntity.getComponent(CView).animatedSprite.zIndex = key;

		if (orderedViewEntity.hasComponent(CBorderView) && configManager.config.debug.showsEntityBorders) {
			const borderViewComponent = orderedViewEntity.getComponent(CBorderView);

			borderViewComponent.border.zIndex = DEBUG_VIEW_Z_OFFSET + key;
		}

		if (orderedViewEntity.hasComponent(CCenterView) && configManager.config.debug.showsEntityCenters) {
			const centerViewComponent = orderedViewEntity.getComponent(CCenterView);

			centerViewComponent.center.zIndex = DEBUG_VIEW_Z_OFFSET + key;
		}

		if (orderedViewEntity.relations.has("hitboxes")) {
			const hitboxEntities = orderedViewEntity.getRelatedEntities("hitboxes");

			hitboxEntities.forEach(hitboxEntity => {
				if (hitboxEntity.hasComponent(CHitboxView) && configManager.config.debug.showsEntityHitboxes) {
					const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

					hitboxViewComponent.hitboxBorder.zIndex = DEBUG_VIEW_Z_OFFSET + key;
				}
			});
		}
	});
};