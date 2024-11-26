import { Assets } from "pixi.js";
import { assetsManager } from "./assetsManager/assetsManager.singletons";
import { watchInput } from "../domains/player/systems/watchInput/watchInput.system";
import { initApplication } from "./initApp/initApp";
import { initCharacters } from "./initCharacters/initCharacters";
import { initLoop } from "./initLoop/initLoop";
import { initFps } from "./initFps/initFps";
import "./reset.css";
import { initEnvironment } from "./initEnvironment/initEnvironment";

// prevent default browser behaviour when left clicking
document.addEventListener("contextmenu", event => event.preventDefault());

await Assets.load("src/assets/fonts/Pixeled/Pixeled.ttf");
await assetsManager.loadAssets();
await initApplication();
initEnvironment();
initCharacters();
initFps();
initLoop();
watchInput();