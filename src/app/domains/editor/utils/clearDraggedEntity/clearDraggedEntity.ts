import { gameEditorStore } from "@root/app/domains/editor/store/store";

/**
 * Stops dragging an entity.
 */
export const clearDraggedEntity = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.draggedEntity) {
		gameEditorStore.draggedEntity.destroy();
		gameEditorStore.draggedEntity = null;
	}
};