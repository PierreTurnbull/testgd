import { Entity } from "@root/app/common/entities/entity.models";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { Container } from "pixi.js";
import { TGameEditorData } from "../data/data.types";
import { TEntityBuilder } from "@root/app/common/types/entityBuilder.types";
import { data } from "../data/data";

type TGameEditorStore = {
	/**
	 * An entity that was created and still needs to be placed in the world.
	 */
	draggedEntity:      Entity | null
	/**
	 * An existing entity that is selected.
	 */
	selectedEntity:     Entity | null
	/**
	 * An item that is selected in the menu. Detailed settings are opened to create an instance of this item.
	 */
	selectedItem:       string | null
	/**
	 * A list of items that can be selected in the menu. This contains the builder functions of the items.
	 */
	availableItems:     Record<string, TEntityBuilder>
	/**
	 * A lock to prevent selecting fresh items when the mouseup event is fired.
	 */
	selectedEntityLock: boolean

	/**
	 * The menu that displays the available items.
	 */
	environmentItemsContainer:        Container | null
	/**
	 * The menu that displays the available variants of an item.
	 */
	environmentItemVariantsContainer: Container | null

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
		gameEditorId,
	};
};