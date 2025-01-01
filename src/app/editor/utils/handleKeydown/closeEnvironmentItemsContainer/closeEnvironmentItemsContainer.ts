import { gameEditorStore } from "@root/app/editor/store/store";

export const closeEnvironmentItemsContainer = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}
	
	if (!gameEditorStore.environmentItemsContainer) {
		return;
	}

	gameEditorStore.environmentItemsContainer.destroy();
	gameEditorStore.environmentItemsContainer = null;
};