import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { Entity } from "@root/app/domains/entity/entity.models";
import { clearDraggedEntity } from "../clearDraggedEntity/clearDraggedEntity";
import { clearSelectedEntity } from "../clearSelectedEntity/clearSelectedEntity";

/**
 * Starts dragging an entity with the mouse.
 */
export const dragEntity = (
	entity: Entity,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.draggedEntity) {
		clearDraggedEntity();
	}

	gameEditorStore.draggedEntity = entity;

	if (gameEditorStore.selectedEntity) {
		clearSelectedEntity();
	}
};