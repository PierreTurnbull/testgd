import { CView } from "@root/app/common/components/view/view.component";
import { gameEditorStore } from "@root/app/editor/store/store";

/**
 * Unselects the selected entity if it exists.
 */
export const clearSelectedEntity = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.selectedEntity) {
		gameEditorStore.selectedEntity.getComponent(CView).view.tint = 0xffffff;
		gameEditorStore.selectedEntity = null;
	}
};