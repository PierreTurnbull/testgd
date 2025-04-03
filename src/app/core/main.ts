import { Assets } from "pixi.js";
import { assetsManager } from "./assetsManager/assetsManager.singletons";
import { initApplication } from "./initApp/initApp";
import { initCharacters } from "./initCharacters/initCharacters";
import { initEnvironment } from "./initEnvironment/initEnvironment";
import { initFps } from "./initFps/initFps";
import { initLoop } from "./initLoop/initLoop";
import { initMouse } from "./initMouse/initMouse";
import { initUi } from "./initUi/initUi";
import "./reset.css";
import { watchInput } from "./systems/watchInput/watchInput.system";

// prevent default browser behaviour when left clicking
document.addEventListener("contextmenu", event => event.preventDefault());

await Assets.load("src/assets/fonts/Pixeled/Pixeled.ttf");
await assetsManager.loadAssets();
await initApplication();
initEnvironment();
initCharacters();
initMouse();
initFps();
initLoop();
watchInput();
initUi();

window.addEventListener("keydown", event => {
	if (event.code === "KeyQ") {
		document.body.style.display = document.body.style.display === "none" ? "block" : "none";
	}
});