import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { CANVAS_HEIGHT } from "@root/app/core/constants/app.constants";
import { gameEditorId, gameEditorStore } from "../../store/store";
import { TMenuHeight } from "../common/createMenu/types/menu.types";
import { updateVisibilityGraphs } from "../common/updateVisibilityGraphs/updateVisibilityGraphs";

export const handleMousedown = (event: MouseEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const mouseIsInWorld = gameEditorStore.globalMouseCoordinates.y < (CANVAS_HEIGHT - TMenuHeight);

	if (event.button === 0 && gameEditorStore.draggedEntity && mouseIsInWorld) {
		gameEditorStore.data.environment.push({
			gameEditorId: gameEditorId,
			name:         gameEditorStore.draggedEntity.name,
			coordinates:  gameEditorStore.mouseCoordinates,
			variant:      gameEditorStore.draggedEntity.getComponent(CVariant).variant,
			direction8:   gameEditorStore.draggedEntity.getComponent(CDirection).direction8,
		});

		updateVisibilityGraphs();

		gameEditorStore.draggedEntity = null;

		gameEditorStore.selectedEntityLock = true;
	}
};