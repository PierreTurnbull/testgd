import { gameEditorStore } from "../../store/store";

export const handleMouseup = (_: MouseEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}
};