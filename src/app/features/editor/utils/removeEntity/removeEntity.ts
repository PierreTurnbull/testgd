import { CGameEditorId } from "@root/app/features/editor/components/gameEditorId.component";
import { gameEditorStore } from "@root/app/features/editor/store/store";

/**
 * Removes an entity from the editor data.
 */
export const removeEntity = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const itemKey = gameEditorStore.data.items.environment.findIndex(item => {
		if (!gameEditorStore) {
			throw new Error("Game editor store is not initialized.");
		}

		if (!gameEditorStore.selectedEntity) {
			throw new Error("Cannot remove entity: no entity is selected.");
		}

		return item.gameEditorId === gameEditorStore.selectedEntity.getComponent(CGameEditorId).gameEditorId;
	});

	if (itemKey !== -1) {
		gameEditorStore.data.items.environment.splice(itemKey, 1);
	}
};