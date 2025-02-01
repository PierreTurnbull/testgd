import { appManager } from "@root/app/domains/app/appManager.singleton";

export const handleKeyDown = (
    event: KeyboardEvent,
) => {
    let isHandled = false;

    if (!isHandled && event.code === "KeyP") {
        if (appManager.app.ticker.started) {
            appManager.app.ticker.stop()
        } else {
            appManager.app.ticker.start()
        }

        isHandled = true
    }

    return isHandled
}