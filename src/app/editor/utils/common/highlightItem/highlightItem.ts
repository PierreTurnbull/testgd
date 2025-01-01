import { CANVAS_HEIGHT } from "@root/app/core/constants/app.constants";
import { Graphics } from "pixi.js";
import { TMenuHeight, TMenuItemHeight, TMenuItemRounding, TMenuItemWidth, TMenuPadding } from "../createMenu/types/menu.types";

export const highlightItem = (
	background: Graphics,
	index: number,
) => {
	background.clear();
	background
		.roundRect(
			(TMenuItemWidth + TMenuPadding) * index + TMenuPadding,
			CANVAS_HEIGHT - TMenuHeight + TMenuPadding,
			TMenuItemWidth,
			TMenuItemHeight,
			TMenuItemRounding,
		)
		.fill(0x202020);
};