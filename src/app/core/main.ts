import { Assets } from "pixi.js";
import { assetsManager } from "../domains/assetsManager/assetsManager.singletons";
import { watchInput } from "./systems/watchInput/watchInput.system";
import { initApplication } from "./utils/initApp/initApp";
import { initCharacters } from "./utils/initCharacters/initCharacters";
import { initEnvironment } from "./utils/initEnvironment/initEnvironment";
import { initFps } from "./utils/initFps/initFps";
import { initLoop } from "./utils/initLoop/initLoop";
import { initMouse } from "./utils/initMouse/initMouse";
import { initUi } from "./utils/initUi/initUi";
import { watchUiBusEvents } from "./utils/watchUiBusEvents/watchUiBusEvents";

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
watchUiBusEvents();
