import { gameEditorStore } from "@root/app/editor/store/store";
import { createMenu } from "../../common/createMenu/createMenu";
import { getItemContainer } from "./getItemContainer/getItemContainer";

export const openEnvironmentItemsContainer = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.environmentItemsContainer) {
		return;
	}

	gameEditorStore.environmentItemsContainer = createMenu();

	const availableItemKeys = Object.keys(gameEditorStore.availableItems);

	for (let i = 0; i < availableItemKeys.length; i++) {
		const key = availableItemKeys[i];

		const environmentItemContainer = getItemContainer(key, i);

		gameEditorStore.environmentItemsContainer.addChild(environmentItemContainer);
	}
};