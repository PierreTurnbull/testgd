import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { appManager } from "@root/app/domains/app/appManager.singleton";

/**
 * Returns the coordinates of the mouse in the canvas.
 */
export const getGlobalMouseCoordinates = () => {
	const x = appManager.app.renderer.events.pointer.x;
	const y = appManager.app.renderer.events.pointer.y;

	const globalMouseCoordinates: TCoordinates = {
		x: Math.round(x),
		y: Math.round(y),
	};

	return globalMouseCoordinates;
};