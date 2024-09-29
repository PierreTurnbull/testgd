import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants/canvas.constants";
import { game } from "../../singletons/game.singletons";

export const initApplication = async () => {
	await game.app.init({
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT,
	});
	document.body.appendChild(game.app.canvas);
};