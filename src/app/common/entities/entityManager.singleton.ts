import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CHitbox } from "../components/hitbox/hitbox.component";
import { CHitboxView } from "../components/hitboxView/hitboxView.component";
import { CTimers } from "../components/timers/timers.component";
import { CView } from "../components/view/view.component";
import { relationsManager } from "../relations/relationsManager.singleton";
import { Entity } from "./entity.models";

class EntityManager {
	__brand = "entityManager";

	entities: Entity[] = [];

	/**
	 * Returns whether the entity is registered in the entity manager.
	 */
	getIsRegistered = (entity: Entity) => {
		const index = this.entities.indexOf(entity);

		return index > -1;
	};

	/**
	 * Removes the entity from the list of entities and puts an end to everything
	 * related to it (relations, timers, views, etc...).
	 */
	destroyEntity = (
		entity: Entity,
	) => {
		// destroy view
	
		if (entity.hasComponent(CView)) {
			const viewComponent = entity.getComponent(CView);
	
			viewComponent.animatedSprite.destroy();
		}
	
		if (configManager.config.debug.showsEntityBorders && entity.hasComponent(CView)) {
			const viewComponent = entity.getComponent(CView);
	
			viewComponent.border.destroy();
		}
	
		if (configManager.config.debug.showsEntityHitbox && entity.hasComponent(CHitboxView)) {
			const hitboxViewComponent = entity.getComponent(CHitboxView);
	
			hitboxViewComponent.hitboxBorder.destroy();
		}

		if (entity.hasComponent(CHitbox)) {
			const hitboxComponent = entity.getComponent(CHitbox);

			collisionsManager.system.remove(hitboxComponent.body);
		}

		// remove from relations

		relationsManager.removeFromRelations(entity);

		// clear timers

		if (entity.hasComponent(CTimers)) {
			const timersComponent = entity.getComponent(CTimers);

			timersComponent.timers.forEach(clearTimeout);
		}

		// remove from entities list

		const index = this.entities.indexOf(entity);
		this.entities.splice(index, 1);
	};
}

export const entityManager = new EntityManager();