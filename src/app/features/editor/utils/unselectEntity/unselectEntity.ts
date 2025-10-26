import { gameEditorStore } from "@root/app/features/editor/store/store";
import { CView } from "@root/app/features/view/components/view.component";

/**
 * Unselects the selected entity if it exists.
 */
export const unselectEntity = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.selectedEntity) {
		gameEditorStore.selectedEntity.getComponent(CView).view.tint = 0xffffff;
		gameEditorStore.selectedEntity = null;
	}
};