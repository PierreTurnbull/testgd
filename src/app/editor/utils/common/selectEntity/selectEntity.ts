import { CView } from "@root/app/common/components/view/view.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { CANVAS_HEIGHT } from "@root/app/core/constants/app.constants";
import { gameEditorStore } from "@root/app/editor/store/store";
import { TMenuHeight } from "../createMenu/types/menu.types";

/**
 * Selects an entity.
 */
export const selectEntity = (
	entity: Entity,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (!gameEditorStore.environmentItemsContainer || gameEditorStore.selectedEntityLock) {
		return;
	}

	const mouseIsInWorld = gameEditorStore.globalMouseCoordinates.y < (CANVAS_HEIGHT - TMenuHeight);
	if (!mouseIsInWorld) {
		return;
	}

	if (gameEditorStore.selectedEntity) {
		gameEditorStore.selectedEntity.getComponent(CView).view.tint = 0xffffff;
	}

	gameEditorStore.selectedEntity = entity;
	entity.getComponent(CView).view.tint = 0xff0000;
};