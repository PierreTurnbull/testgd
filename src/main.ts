import { init } from "./domains/game/logic/init/init.logic";
import "./domains/reset.css";

// prevent default browser behaviour when left clicking
document.addEventListener("contextmenu", event => event.preventDefault());

init();