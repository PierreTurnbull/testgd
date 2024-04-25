import { setMonster1ActionFromKeyboard, setPlayerActionFromKeyboard } from "@root/logic/actions/setActionFromKeyboard"
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/constants"
import { process } from "@root/logic/process/process"
import { initEntities } from "@root/logic/initEntities/initEntities"
import { loadTextures } from "@root/logic/load/textures/loadTextures"
import * as PIXI from "pixi.js"
import { TGame } from "@root/types/game/game.type"
import { Monster1 } from "@root/entities/characters/monster1/monster1.entity"
import { TPerformanceTracker } from "@root/types/performanceTracker/performanceTracker.type"
import { startPerformanceLap } from "@root/logic/performance/performance"
import { loadSpritesheets } from "@root/logic/load/spritesheets/spritesheets"

class Game {
	constructor() {
		this.app = new PIXI.Application({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
		// @ts-expect-error: PIXI's typing is failing
		document.body.appendChild(this.app.view)

		this.background = new PIXI.Graphics()
		this.background.beginFill(0xAF4F2A)
		this.background.drawRect(0, 0, 800, 700)
		this.background.endFill()
		this.background.eventMode = "static"
		this.app.stage.addChild(this.background)
	}

	initGame = async () => {
		await loadTextures()
		await loadSpritesheets()
		initEntities()
	}

	startGame = async () => {
		this.app.ticker.add((delta) => {
			startPerformanceLap()
			setPlayerActionFromKeyboard(game.player)
			game.monsters.forEach(monster => {
				if (monster instanceof Monster1) setMonster1ActionFromKeyboard(monster)
			})
			process(delta)
		})
	}

	app: PIXI.Application

	_entities: TGame["entities"] = {
		characters: {
			player: null,
			monsters: [],
		},
	}

	get player () {
		if (!this._entities.characters.player) throw new Error("Missing player.")
		return this._entities.characters.player
	}
	set player (value) {
		this._entities.characters.player = value
	}

	get monsters () {
		return this._entities.characters.monsters
	}
	set monsters (value) {
		this._entities.characters.monsters = value
	}

	private _textures: TTextures | null = null
	get textures() {
		if (!this._textures) throw new Error("Textures are not ready.")
		return this._textures
	}
	set textures(value) {
		this._textures = value
	}

	background: PIXI.Graphics

	performanceTracker: TPerformanceTracker = {
		current: null,
		graphics: null,
		history: [],
	}
}

export const game = new Game()