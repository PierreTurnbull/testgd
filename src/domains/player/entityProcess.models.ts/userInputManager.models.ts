import { KeyboardManager } from "@root/domains/keyboardManager/models/keyboardManager.models";
import debounce from "lodash/debounce";

export class UserInputManager {
	constructor(keyboardManager: KeyboardManager) {
		this.keyboardManager = keyboardManager;
		this.watchInput();
	}

	keyboardManager: KeyboardManager;

	watchInput() {
		const resetKey = debounce((keyCode: string) => {
			this.keyboardManager.keyboard[keyCode] = false;
		}, 250);

		window.onkeydown = event => {
			// todo : check if resetKey needed.
			resetKey(event.code);

			this.keyboardManager.keyboard[event.code] = true;
		};

		window.onkeyup = event => {
			this.keyboardManager.keyboard[event.code] = false;
		};
	}
}