import { appManager } from "@root/app/features/app/appManager.singleton";

export const handleKeyDown = (
	event: KeyboardEvent,
) => {
	let isHandled = false;

	if (event.code === "KeyP") {
		if (appManager.app.ticker.started) {
			appManager.app.ticker.stop();
		} else {
			appManager.app.ticker.start();
		}

		isHandled = true;
	}

	return isHandled;
};