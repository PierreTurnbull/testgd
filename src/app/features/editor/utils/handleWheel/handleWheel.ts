import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CVariant } from "@root/app/ecs/components/common/variant.component";
import { DIRECTIONS8 } from "@root/app/features/math/constants/space.constants";
import { gameEditorStore } from "../../store/store";
import { createEntity } from "../createEntity/createEntity";
import { getEntityIsPersisted } from "../getEntityIsPersisted/getEntityIsPersisted";
import { startDraggingEntity } from "../startDraggingEntity/startDraggingEntity";
import { stopDraggingEntity } from "../stopDraggingEntity/stopDraggingEntity";

export const handleWheel = (event: WheelEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.draggedEntity) {
		const isPersisted = getEntityIsPersisted(gameEditorStore.draggedEntity);

		if (isPersisted) {
			return;
		}

		const currentVariant = gameEditorStore.draggedEntity.getComponent(CVariant).variant;
		const currentDirection8 = gameEditorStore.draggedEntity.getComponent(CDirection).direction8;
		const key = DIRECTIONS8.indexOf(currentDirection8);
		const name = gameEditorStore.draggedEntity.name;
		let nextDirection8 = currentDirection8;

		stopDraggingEntity();

		if (event.deltaY > 0) {
			if (key === 0) {
				nextDirection8 = DIRECTIONS8[DIRECTIONS8.length - 1];
			} else {
				nextDirection8 = DIRECTIONS8[key - 1];
			}
		} else if (event.deltaY < 0) {
			if (key === DIRECTIONS8.length - 1) {
				nextDirection8 = DIRECTIONS8[0];
			} else {
				nextDirection8 = DIRECTIONS8[key + 1];
			}
		}

		const entity = createEntity(name, currentVariant, nextDirection8);
		startDraggingEntity(entity);
	}
};