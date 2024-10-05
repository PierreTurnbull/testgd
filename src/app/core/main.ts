import { animatedSpritesManager } from "../common/animatedSprites/animatedSpritesManager.singletons";
import { watchInput } from "../domains/player/systems/watchInput/watchInput.system";
import { initApplication } from "./initApp/initApp";
import { initCharacters } from "./initCharacters/initCharacters";
import { initLoop } from "./initLoop/initLoop";
import "./reset.css";

// prevent default browser behaviour when left clicking
document.addEventListener("contextmenu", event => event.preventDefault());

await animatedSpritesManager.loadAnimatedSprites();
await initApplication();
initLoop();
initCharacters();
watchInput();