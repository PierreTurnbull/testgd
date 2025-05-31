import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TEntityBuilder } from "@root/app/common/types/entityBuilder.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { data } from "../data/data";
import { TGameEditorData } from "../data/data.types";

type TGameEditorStore = {
	/**
	 * An entity that was created and still needs to be placed in the world.
	 */
	draggedEntity:           Entity | null
	/**
	 * An existing entity that is selected.
	 */
	selectedEntity:          Entity | null
	/**
	 * A list of items that can be selected in the menu. This contains the builder functions of the items.
	 */
	availableEntityBuilders: Record<string, TEntityBuilder>

	playerCoordinates:      TCoordinates
	mouseCoordinates:       TCoordinates
	globalMouseCoordinates: TCoordinates

	data: TGameEditorData

	gameEditorId: number,
}

export let gameEditorId = 0;
export const incrementGameEditorId = () => gameEditorId++;

// Ensures the next gameEditorIds are higher than all the previous ones, in order to prevent duplicating them.
data.environment.forEach(environment => {
	if (gameEditorId <= environment.gameEditorId) {
		gameEditorId = environment.gameEditorId + 1;
	}
});

export let gameEditorStore: TGameEditorStore | null = null;
export const setGameEditorStore = (newGameEditorStore: Omit<TGameEditorStore, "gameEditorId">) => {
	gameEditorStore = {
		...newGameEditorStore,
		gameEditorId: gameEditorId,
	};
};