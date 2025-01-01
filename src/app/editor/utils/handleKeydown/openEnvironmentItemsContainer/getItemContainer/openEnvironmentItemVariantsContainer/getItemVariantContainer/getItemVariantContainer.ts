import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { CANVAS_HEIGHT } from "@root/app/core/constants/app.constants";
import { gameEditorStore } from "@root/app/editor/store/store";
import { createEntity } from "@root/app/editor/utils/common/createEntity/createEntity";
import { TMenuHeight, TMenuItemHeight, TMenuItemRounding, TMenuItemWidth, TMenuPadding } from "@root/app/editor/utils/common/createMenu/types/menu.types";
import { dragEntity } from "@root/app/editor/utils/common/dragEntity/dragEntity";
import { unhighlightItem } from "@root/app/editor/utils/common/unhighlightItem/unhighlightItem";
import { Container, Graphics, Sprite } from "pixi.js";
import { highlightItem } from "../../../../../common/highlightItem/highlightItem";

/**
 * Returns a container that displays an item. This container can be clicked to create an instance of the item.
 */
export const getItemVariantContainer = (
	name: string,
	variant: number,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const environmentItemVariantContainer = new Container();
	const environmentItemVariantBackground = new Graphics()
		.roundRect(
			90 * variant + TMenuPadding,
			CANVAS_HEIGHT - TMenuHeight + TMenuPadding,
			TMenuItemWidth,
			TMenuItemHeight,
			TMenuItemRounding,
		)
		.fill(0x151515);
	const environmentItemVariant = new Sprite(assetsManager.textures[`environment.${name}.${variant}.down`]);
	environmentItemVariant.x = 90 * variant + TMenuPadding;
	environmentItemVariant.y = CANVAS_HEIGHT - TMenuHeight + TMenuPadding;
	environmentItemVariant.width = 80;
	environmentItemVariant.height = 80;
	environmentItemVariant.interactive = true;

	environmentItemVariant.onclick = () => {
		if (!gameEditorStore) {
			throw new Error("Game editor store is not initialized.");
		}

		const entity = createEntity(name, variant, "down");
		dragEntity(entity);
	};
	environmentItemVariant.onmouseover = () => highlightItem(environmentItemVariantBackground, variant);
	environmentItemVariant.onmouseout = () => unhighlightItem(environmentItemVariantBackground, variant);

	environmentItemVariantContainer.addChild(environmentItemVariantBackground);
	environmentItemVariantContainer.addChild(environmentItemVariant);

	return environmentItemVariantContainer;
};