import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { Entity } from "@root/app/domains/entity/entity.models";
import { getEntityIsPersisted } from "../getEntityIsPersisted/getEntityIsPersisted";
import { stopDraggingEntity } from "../stopDraggingEntity/stopDraggingEntity";
import { unselectEntity } from "../unselectEntity/unselectEntity";

/**
 * Starts dragging an entity with the mouse.
 */
export const startDraggingEntity = (
	entity: Entity,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.draggedEntity) {
		stopDraggingEntity();
	}

	const isPersisted = getEntityIsPersisted(entity);
	if (isPersisted) {
		const initialCoordinates = entity.getComponent(CLocation).coordinates;
		gameEditorStore.draggedEntityInitialCoordinates = {
			x: initialCoordinates.x,
			y: initialCoordinates.y,
		};
	}

	if (gameEditorStore.selectedEntity) {
		unselectEntity();
	}

	entity.getComponent(CView).view.tint = 0xff7700;
	gameEditorStore.draggedEntity = entity;
};