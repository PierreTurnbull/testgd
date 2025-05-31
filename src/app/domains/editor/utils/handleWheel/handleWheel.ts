import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { DIRECTIONS8 } from "@root/app/common/constants/space.constants";
import { clearDraggedEntity } from "@root/app/domains/editor/utils/clearDraggedEntity/clearDraggedEntity";
import { createEntity } from "@root/app/domains/editor/utils/createEntity/createEntity";
import { dragEntity } from "@root/app/domains/editor/utils/dragEntity/dragEntity";
import { gameEditorStore } from "../../store/store";

export const handleWheel = (event: WheelEvent) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.draggedEntity) {
		const currentVariant = gameEditorStore.draggedEntity.getComponent(CVariant).variant;
		const currentDirection8 = gameEditorStore.draggedEntity.getComponent(CDirection).direction8;
		const key = DIRECTIONS8.indexOf(currentDirection8);
		const name = gameEditorStore.draggedEntity.name;
		let nextDirection8 = currentDirection8;

		clearDraggedEntity();

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
		dragEntity(entity);
	}
};