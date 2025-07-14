import { CGameEditorId } from "@root/app/common/components/gameEditorId/gameEditorId.component";
import { Entity } from "@root/app/domains/entity/entity.models";
import { gameEditorStore } from "../../store/store";

/**
 * Returns whether the entity is persisted in the game editor data.
 */
export const getEntityIsPersisted = (
	entity: Entity,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const gameEditorId = entity.getComponent(CGameEditorId).gameEditorId;
	const isPersisted = Boolean(gameEditorStore.data.items.environment.find(environmentItem => environmentItem.gameEditorId === gameEditorId));

	return isPersisted;
};