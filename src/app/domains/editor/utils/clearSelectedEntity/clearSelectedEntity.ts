import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { unselectEntity } from "../unselectEntity/unselectEntity";

/**
 * Clears the selected entity if it exists.
 */
export const clearSelectedEntity = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.selectedEntity) {
		unselectEntity();
		gameEditorStore.selectedEntity = null;
	}
};