import { CANVAS_HEIGHT } from "@root/app/common/constants/app.constants";
import { updateVisibilityGraphs } from "@root/app/domains/editor/utils/updateVisibilityGraphs/updateVisibilityGraphs";
import { EDITOR_BAR_HEIGHT } from "@root/app/ui/constants/ui.constants";
import { gameEditorStore } from "../../store/store";
import { registerEntity } from "../registerEntity/registerEntity";
import { stopDraggingEntity } from "../stopDraggingEntity/stopDraggingEntity";

export const handleMousedown = async (event: MouseEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const mouseIsInWorld = gameEditorStore.globalMouseCoordinates.y < (CANVAS_HEIGHT - EDITOR_BAR_HEIGHT);

	if (event.button === 0 && gameEditorStore.draggedEntity && mouseIsInWorld) {
		registerEntity(gameEditorStore.draggedEntity);
		gameEditorStore.draggedEntityInitialCoordinates = null;
		stopDraggingEntity();
		updateVisibilityGraphs();
	}
};