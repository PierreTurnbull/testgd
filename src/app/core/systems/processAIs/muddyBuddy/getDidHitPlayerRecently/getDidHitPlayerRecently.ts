import { Entity } from "@root/app/domains/entity/entity.models";
import { CMemory } from "@root/app/domains/memory/components/memory/memory.component";

export const getDidHitPlayerRecently = (
	muddyBuddyEntity: Entity,
) => {
	const memoryComponent = muddyBuddyEntity.getComponent(CMemory);

	const didHitPlayerRecently = memoryComponent.memory.some(memoryItem => {
		return (
			memoryItem.type === "didHit" &&
			memoryItem.victim.name === "player" &&
			memoryItem.timestamp > new Date().getTime() - 1000
		);
	});

	return didHitPlayerRecently;
};