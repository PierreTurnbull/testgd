import { applyNextCoordinates } from "@root/app/features/motion/utils/applyNextCoordinates/applyNextCoordinates";
import { CView } from "@root/app/features/view/components/view.component";
import { uiBus } from "@root/app/ui/utils/uiBus/uiBus.singleton";
import { gameEditorStore } from "../../store/store";
import { getEntityIsPersisted } from "../getEntityIsPersisted/getEntityIsPersisted";

/**
 * Stops dragging an entity.
 */
export const stopDraggingEntity = async () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.draggedEntity) {
		if (gameEditorStore.draggedEntityInitialCoordinates) {
			applyNextCoordinates(gameEditorStore.draggedEntity, {
				x: gameEditorStore.draggedEntityInitialCoordinates.x,
				y: gameEditorStore.draggedEntityInitialCoordinates.y,
			});
		}

		const isPersisted = getEntityIsPersisted(gameEditorStore.draggedEntity);
		if (!isPersisted) {
			gameEditorStore.draggedEntity.destroy();
		}

		gameEditorStore.draggedEntity.getComponent(CView).view.tint = 0xffffff;

		gameEditorStore.draggedEntity = null;
		gameEditorStore.draggedEntityInitialCoordinates = null;
	}

	await uiBus.emit("stopDraggingEntity");
};