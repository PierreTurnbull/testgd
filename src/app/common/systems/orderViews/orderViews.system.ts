import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { ASortableView } from "../../archetypes/sortableView/sortableView.archetype";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CView } from "../../components/view/view.component";

/**
 * Updates the order in which views are rendered.
 * This makes items that are "further" appear behind items that are "closer".
 */
export const orderViews = () => {
	const sortableViewEntities = archetypeManager.getEntitiesByArchetype(ASortableView);

	const orderedViewEntities = sortableViewEntities.sort((a, b) => {
		const aHitbox = a.getComponent(CHitbox);
		const bHitbox = b.getComponent(CHitbox);

		if (aHitbox.body.maxY > bHitbox.body.maxY) return 1;
		if (aHitbox.body.maxY < bHitbox.body.maxY) return -1;
		return 0;
	});

	orderedViewEntities.forEach((orderedViewEntity, key) => {
		orderedViewEntity.getComponent(CView).animatedSprite.zIndex = key;
	});
};