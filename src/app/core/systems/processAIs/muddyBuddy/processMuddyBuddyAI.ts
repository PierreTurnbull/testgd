import { muddyBuddyArchetype } from "@root/app/common/archetypes/muddyBuddy/muddyBuddy.archetype";
import { CHealth } from "@root/app/common/components/health/health.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { getDidHitPlayerRecently } from "./getDidHitPlayerRecently/getDidHitPlayerRecently";
import { moveTowardsTarget } from "./moveTowardsTarget/moveTowardsTarget";

export const processMuddyBuddyAI = (
	playerEntity: Entity,
) => {
	const playerHealthComponent = playerEntity.getComponent(CHealth);

	const muddyBuddyEntities = [...muddyBuddyArchetype.entities];

	muddyBuddyEntities.forEach(muddyBuddyEntity => {
		const keyboardComponent = muddyBuddyEntity.getComponent(CKeyboard);

		if (muddyBuddyEntity.getComponent(CHealth).health === 0) {
			keyboardComponent.joystickAngle = null;
			return;
		}

		if (playerHealthComponent.health === 0 || getDidHitPlayerRecently(muddyBuddyEntity)) {
			keyboardComponent.joystickAngle = null;
		} else {
			moveTowardsTarget(muddyBuddyEntity, playerEntity);
		}
	});
};