import { uiBus } from "@root/app/core/ui/utils/uiBus/uiBus.singleton";
import { gameEditorStore } from "../../store/store";
import { clearSelectedEntity } from "../common/clearSelectedEntity/clearSelectedEntity";
import { updateVisibilityGraphs } from "../common/updateVisibilityGraphs/updateVisibilityGraphs";
import { closeEnvironmentItemsContainer } from "./closeEnvironmentItemsContainer/closeEnvironmentItemsContainer";
import { closeEnvironmentItemVariantsContainer } from "./openEnvironmentItemsContainer/getItemContainer/closeEnvironmentItemVariantsContainer/closeEnvironmentItemVariantsContainer";
import { removeEntity } from "./removeEntity/removeEntity";

/**
 * Handles game editor events.
 * @returns whether the event was handled
 */
export const handleKeydown = async (event: KeyboardEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (event.code === "Backquote" /* ² */) {
		await uiBus.emit("closeFocusedUi");

		return true;
	}

	if (gameEditorStore.environmentItemsContainer) {
		if (event.code === "Escape") {
			// const response = await uiBus.emit("closeFocusedUi");
			// if (gameEditorStore.draggedEntity) {
			// 	gameEditorStore.draggedEntity.destroy();
			// 	gameEditorStore.draggedEntity = null;
			// } else if (gameEditorStore.selectedEntity) {
			// 	clearSelectedEntity();
			// } else if (gameEditorStore.selectedItem) {
			// 	gameEditorStore.selectedItem = null;
			// 	closeEnvironmentItemVariantsContainer();
			// } else {
			// 	closeEnvironmentItemsContainer();
			// }
		}

		if (gameEditorStore.selectedEntity && event.code === "KeyX") {
			gameEditorStore.selectedEntity.destroy();
			removeEntity();
			updateVisibilityGraphs();
		}
	}

	// save the game data
	if (event.ctrlKey && event.code === "KeyS") {
		try {
			await fetch("http://localhost:12201/editor", {
				method:  "put",
				body:    JSON.stringify(gameEditorStore.data),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error(error);
		}
		return true;
	}

	return false;
};