import { appManager } from "@root/app/domains/app/appManager.singleton";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app.constants";
import { Graphics } from "pixi.js";

export const initApplication = async () => {
	await appManager.app.init({
		width:  CANVAS_WIDTH,
		height: CANVAS_HEIGHT,
	});
	document.body.appendChild(appManager.app.canvas);
	const graphics = new Graphics()
		.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
		.fill(0x1099bb);
	appManager.app.stage.addChild(graphics);
};