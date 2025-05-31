import { CView } from "@root/app/common/components/view/view.component";
import { CANVAS_HEIGHT } from "@root/app/common/constants/app.constants";
import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { Entity } from "@root/app/domains/entity/entity.models";
import { EDITOR_BAR_HEIGHT } from "@root/app/ui/constants/ui.constants";
import { sharedStore } from "@root/app/ui/sharedStore/sharedStore";
import { unselectEntity } from "../unselectEntity/unselectEntity";

/**
 * Selects an entity. This means the entity is highlighted, allowing specific actions
 * such as deleting.
 */
export const selectEntity = (
	entity: Entity,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}
	
	if (!sharedStore.editorMenuIsOpen) {
		return;
	}

	if (gameEditorStore.draggedEntity) {
		return;
	}

	const mouseIsInWorld = gameEditorStore.globalMouseCoordinates.y < (CANVAS_HEIGHT - EDITOR_BAR_HEIGHT);
	if (!mouseIsInWorld) {
		return;
	}

	unselectEntity();

	gameEditorStore.selectedEntity = entity;
	entity.getComponent(CView).view.tint = 0xff0000;
};