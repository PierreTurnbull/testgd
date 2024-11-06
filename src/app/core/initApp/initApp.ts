import { appManager } from "@root/app/domains/app/appManager.singleton";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app.constants";

export const initApplication = async () => {
	await appManager.app.init({
		// width:  CANVAS_WIDTH,
		// height: CANVAS_HEIGHT,
		width:  window.innerWidth,
		height: window.innerHeight,
	});
	document.body.appendChild(appManager.app.canvas);
};