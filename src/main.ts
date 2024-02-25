import "./reset.css"

import { game } from "./game/game"

// prevent default browser behaviour when left clicking
document.addEventListener("contextmenu", event => event.preventDefault())

await game.initGame()
game.startGame()