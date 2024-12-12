import { Application } from "pixi.js";

class AppManager {
	constructor() {
		this.app = new Application();

	}

	app: Application;
}

export const appManager = new AppManager();