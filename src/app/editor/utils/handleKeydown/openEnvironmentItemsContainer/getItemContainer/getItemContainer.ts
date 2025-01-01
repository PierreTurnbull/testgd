import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { CANVAS_HEIGHT } from "@root/app/core/constants/app.constants";
import { gameEditorStore } from "@root/app/editor/store/store";
import { Container, Graphics, Sprite } from "pixi.js";
import { highlightItem } from "../../../common/highlightItem/highlightItem";
import { unhighlightItem } from "../../../common/unhighlightItem/unhighlightItem";
import { openEnvironmentItemVariantsContainer } from "./openEnvironmentItemVariantsContainer/openEnvironmentItemVariantsContainer";
import { TMenuHeight, TMenuItemHeight, TMenuItemRounding, TMenuItemWidth, TMenuPadding } from "../../../common/createMenu/types/menu.types";

/**
 * Returns a container that displays an item. This container can be clicked to create an instance of the item.
 */
export const getItemContainer = (
	name: string,
	index: number,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const environmentItemContainer = new Container();
	const environmentItemBackground = new Graphics()
		.roundRect(
			(TMenuItemWidth + TMenuPadding) * index + TMenuPadding,
			CANVAS_HEIGHT - TMenuHeight + TMenuPadding,
			TMenuItemWidth,
			TMenuItemHeight,
			TMenuItemRounding,
		)
		.fill(0x151515);
	const environmentItem = new Sprite(assetsManager.textures[`environment.${name}.0.down`]);
	environmentItem.x = (TMenuItemWidth + TMenuPadding) * index + TMenuPadding;
	environmentItem.y = CANVAS_HEIGHT - TMenuHeight + TMenuPadding;
	environmentItem.width = 80;
	environmentItem.height = 80;
	environmentItem.interactive = true;
	environmentItem.onclick = () => {
		if (!gameEditorStore) {
			throw new Error("Game editor store is not initialized.");
		}

		gameEditorStore.selectedItem = name;
		openEnvironmentItemVariantsContainer(name);
	};
	environmentItem.onmouseover = () => highlightItem(environmentItemBackground, index);
	environmentItem.onmouseout = () => unhighlightItem(environmentItemBackground, index);

	environmentItemContainer.addChild(environmentItemBackground);
	environmentItemContainer.addChild(environmentItem);

	return environmentItemContainer;
};