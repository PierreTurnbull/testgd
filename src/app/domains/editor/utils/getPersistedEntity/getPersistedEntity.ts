import { gameEditorStore } from "../../store/store";

/**
 * Returns the entity persisted in the game editor data.
 */
export const getPersistedEntity = (
	gameEditorId: number,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const persistedEntity = gameEditorStore.data.environment.find(environmentItem => environmentItem.gameEditorId === gameEditorId);

	return persistedEntity;
};