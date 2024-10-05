import { Assets } from "pixi.js";
import { animatedSpritesManager } from "../common/animatedSprites/animatedSpritesManager.singletons";
import { watchInput } from "../domains/player/systems/watchInput/watchInput.system";
import { initApplication } from "./initApp/initApp";
import { initCharacters } from "./initCharacters/initCharacters";
import { initLoop } from "./initLoop/initLoop";
import { initFps } from "./initFps/initFps";
import "./reset.css";

// prevent default browser behaviour when left clicking
document.addEventListener("contextmenu", event => event.preventDefault());

await Assets.load("src/assets/fonts/Pixeled/Pixeled.ttf");
await animatedSpritesManager.loadAnimatedSprites();
await initApplication();
initLoop();
initCharacters();
initFps();
watchInput();