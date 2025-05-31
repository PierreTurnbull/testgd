import { applyNextCoordinates } from "@root/app/common/utils/applyNextCoordinates/applyNextCoordinates";
import { gameEditorStore } from "../../store/store";
import { getMouseCoordinates } from "../getMouseCoordinates/getMouseCoordinates";
import { getGlobalMouseCoordinates } from "../getGlobalMouseCoordinates/getGlobalMouseCoordinates";

export const handleMousemove = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	gameEditorStore.mouseCoordinates = getMouseCoordinates();
	gameEditorStore.globalMouseCoordinates = getGlobalMouseCoordinates();

	if (gameEditorStore.draggedEntity && gameEditorStore.mouseCoordinates) {
		applyNextCoordinates(gameEditorStore.draggedEntity, gameEditorStore.mouseCoordinates);
	}
};