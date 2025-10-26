import { appManager } from "@root/app/features/app/appManager.singleton";
import { Container } from "pixi.js";

class WorldManager {
	constructor() {
		this.world = new Container();
		appManager.app.stage.addChild(this.world);
	}

	world: Container;
}

export const worldManager = new WorldManager();