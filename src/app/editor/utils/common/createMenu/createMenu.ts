import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/core/constants/app.constants";
import { appManager } from "@root/app/domains/app/appManager.singleton";
import { gameEditorStore } from "@root/app/editor/store/store";
import { Container, Graphics } from "pixi.js";
import { TMenuHeight } from "./types/menu.types";

export const createMenu = () => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const menuBackground = new Graphics()
		.rect(0, CANVAS_HEIGHT - TMenuHeight, CANVAS_WIDTH, CANVAS_HEIGHT)
		.fill(0x000000);
	const menuContainer = new Container();
	menuContainer.addChild(menuBackground);
	appManager.app.stage.addChild(menuContainer);

	return menuContainer;
};