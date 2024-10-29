import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { AMuddyBuddy } from "../../archetypes/muddyBuddy/muddyBuddy.archetype";
import { CAction } from "../../components/action/action.component";
import { CDirection } from "../../components/direction/direction.component";
import { CKeyboard } from "../../components/keyboard/keyboard.component";

/**
 * Generates NPCs actions.
 */
export const processAIs = () => {
	const muddyBuddyEntities = archetypeManager.getEntitiesByArchetype(AMuddyBuddy);

	muddyBuddyEntities.forEach(muddyBuddyEntity => {
		const actionComponent = muddyBuddyEntity.getComponent(CAction);
		const directionComponent = muddyBuddyEntity.getComponent(CDirection);
		const keyboardComponent = muddyBuddyEntity.getComponent(CKeyboard);

		if (actionComponent.updatedAt + 1000 < new Date().getTime()) {
			if (directionComponent.direction === "downLeft") {
				keyboardComponent.keyboard["KeyW"] = true;
				keyboardComponent.keyboard["KeyD"] = true;
				keyboardComponent.keyboard["KeyS"] = false;
				keyboardComponent.keyboard["KeyA"] = false;
			} else {
				keyboardComponent.keyboard["KeyW"] = false;
				keyboardComponent.keyboard["KeyD"] = false;
				keyboardComponent.keyboard["KeyS"] = true;
				keyboardComponent.keyboard["KeyA"] = true;
			}

			// if (directionComponent.direction === "down") {
			// 	// keyboardComponent.keyboard["KeyS"] = false;
			// 	// keyboardComponent.keyboard["KeyW"] = true;
			// } else {
			// 	keyboardComponent.keyboard["KeyS"] = true;
			// 	keyboardComponent.keyboard["KeyW"] = false;
			// }

			// keyboardComponent.keyboard["KeyW"] = new Date().getTime() * muddyBuddyEntity.id % 2 === 0;
			// keyboardComponent.keyboard["KeyD"] = Math.round(new Date().getTime() * muddyBuddyEntity.id / 10) % 2 === 0;
			// keyboardComponent.keyboard["KeyS"] = Math.round(new Date().getTime() * muddyBuddyEntity.id / 100) % 2 === 0;
			// keyboardComponent.keyboard["KeyA"] = Math.round(new Date().getTime() * muddyBuddyEntity.id / 1000) % 2 === 0;
		}
	});
};