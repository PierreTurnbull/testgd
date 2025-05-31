import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { gameEditorId, gameEditorStore, incrementGameEditorId } from "@root/app/domains/editor/store/store";

/**
 * Creates an entity using the editor.
 * @returns the entity created
 */
export const createEntity = (
	name: string,
	variant: number,
	direction8: TDirection8,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const builder = gameEditorStore.availableEntityBuilders[name];
	const entity = builder(gameEditorStore.mouseCoordinates, variant, direction8, gameEditorId);
	incrementGameEditorId();

	return entity;
};