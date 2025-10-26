import { CHealth } from "@root/app/ecs/components/common/health.component";
import { CKeyboard } from "@root/app/ecs/components/common/keyboard.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { muddyBuddyArchetype } from "@root/app/features/muddyBuddy/archetypes/muddyBuddy.archetype";
import { getDidHitPlayerRecently } from "./getDidHitPlayerRecently/getDidHitPlayerRecently";
import { moveTowardsTarget } from "./moveTowardsTarget/moveTowardsTarget";

export const processMuddyBuddyAi = (
	playerEntity: Entity,
) => {
	const playerHealthComponent = playerEntity.getComponent(CHealth);

	const muddyBuddyEntities = [...muddyBuddyArchetype.entities];

	muddyBuddyEntities.forEach(muddyBuddyEntity => {
		const keyboardComponent = muddyBuddyEntity.getComponent(CKeyboard);

		if (playerHealthComponent.health === 0 || getDidHitPlayerRecently(muddyBuddyEntity)) {
			keyboardComponent.joystickAngle = null;
		} else {
			moveTowardsTarget(muddyBuddyEntity, playerEntity);
		}
	});
};