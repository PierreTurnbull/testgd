import { unselectEntity } from "@root/app/domains/editor/utils/unselectEntity/unselectEntity";
import { updateVisibilityGraphs } from "@root/app/domains/editor/utils/updateVisibilityGraphs/updateVisibilityGraphs";
import { uiBus } from "@root/app/ui/utils/uiBus/uiBus.singleton";
import { gameEditorStore } from "../../store/store";
import { removeEntity } from "../removeEntity/removeEntity";
import { startDraggingEntity } from "../startDraggingEntity/startDraggingEntity";
import { stopDraggingEntity } from "../stopDraggingEntity/stopDraggingEntity";

/**
 * Handles game editor events.
 * @returns whether the event was handled
 */
export const handleKeydown = async (event: KeyboardEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (event.code === "Backquote" /* ² */) {
		await uiBus.emit("toggleEditorBarIsOpen");

		if (gameEditorStore.draggedEntity) {
			stopDraggingEntity();
		}

		if (gameEditorStore.selectedEntity) {
			unselectEntity();
		}

		return true;
	}

	if (event.code === "Escape") {
		if (gameEditorStore.draggedEntity) {
			stopDraggingEntity();
		} else if (gameEditorStore.selectedEntity) {
			unselectEntity();
		} else {
			await uiBus.emit("closeFocusedUi");
		}
	}

	if (gameEditorStore.selectedEntity && event.code === "KeyX") {
		gameEditorStore.selectedEntity.destroy();
		removeEntity();
		unselectEntity();
		updateVisibilityGraphs();
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

	if (event.code === "Semicolon") {
		if (gameEditorStore.selectedEntity) {
			startDraggingEntity(gameEditorStore.selectedEntity);
		}
	}

	return false;
};