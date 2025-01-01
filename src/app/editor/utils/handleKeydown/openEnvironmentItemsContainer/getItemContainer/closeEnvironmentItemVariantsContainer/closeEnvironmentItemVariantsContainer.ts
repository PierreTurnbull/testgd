import { gameEditorStore } from "@root/app/editor/store/store";
import { clearDraggedEntity } from "@root/app/editor/utils/common/clearDraggedEntity/clearDraggedEntity";
import { clearSelectedEntity } from "@root/app/editor/utils/common/clearSelectedEntity/clearSelectedEntity";

export const closeEnvironmentItemVariantsContainer = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}
	
	if (!gameEditorStore.environmentItemVariantsContainer) {
		return;
	}

	gameEditorStore.environmentItemVariantsContainer.destroy();
	gameEditorStore.environmentItemVariantsContainer = null;

	clearSelectedEntity();
	clearDraggedEntity();
};