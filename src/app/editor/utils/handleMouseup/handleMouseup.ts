import { gameEditorStore } from "../../store/store";

export const handleMouseup = (event: MouseEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (event.button === 0) {
		gameEditorStore.selectedEntityLock = false;
	}
};