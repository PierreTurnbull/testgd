import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVariant } from "@root/app/ecs/components/common/variant.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { gameEditorStore } from "@root/app/features/editor/store/store";
import { CView } from "@root/app/features/view/components/view.component";
import { uiBus } from "@root/app/ui/utils/uiBus/uiBus.singleton";
import { getEntityIsPersisted } from "../getEntityIsPersisted/getEntityIsPersisted";
import { stopDraggingEntity } from "../stopDraggingEntity/stopDraggingEntity";
import { unselectEntity } from "../unselectEntity/unselectEntity";

/**
 * Starts dragging an entity with the mouse.
 */
export const startDraggingEntity = async (
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
	
	await uiBus.emit("startDraggingEntity", {
		payload: {
			name:    entity.name,
			variant: entity.getComponent(CVariant).variant,
		},
	});
};