import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CGameEditorId } from "@root/app/common/components/gameEditorId/gameEditorId.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { CANVAS_HEIGHT } from "@root/app/common/constants/app.constants";
import { updateVisibilityGraphs } from "@root/app/domains/editor/utils/updateVisibilityGraphs/updateVisibilityGraphs";
import { EDITOR_BAR_HEIGHT } from "@root/app/ui/constants/ui.constants";
import { gameEditorStore } from "../../store/store";

export const handleMousedown = (event: MouseEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const mouseIsInWorld = gameEditorStore.globalMouseCoordinates.y < (CANVAS_HEIGHT - EDITOR_BAR_HEIGHT);

	if (event.button === 0 && gameEditorStore.draggedEntity && mouseIsInWorld) {
		gameEditorStore.data.environment.push({
			gameEditorId: gameEditorStore.draggedEntity.getComponent(CGameEditorId).gameEditorId,
			name:         gameEditorStore.draggedEntity.name,
			coordinates:  gameEditorStore.mouseCoordinates,
			variant:      gameEditorStore.draggedEntity.getComponent(CVariant).variant,
			direction8:   gameEditorStore.draggedEntity.getComponent(CDirection).direction8,
		});

		updateVisibilityGraphs();

		gameEditorStore.draggedEntity = null;
	}
};