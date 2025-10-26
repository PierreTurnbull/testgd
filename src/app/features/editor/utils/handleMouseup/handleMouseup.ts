import { gameEditorStore } from "../../store/store";

export const handleMouseup = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}
};