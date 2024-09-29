import { TAnimatedSprites } from "@root/domains/viewContainer/children/animatedSprite/logic/loadAnimatedSprites/loadAnimatedSprites.type";
import * as PIXI from "pixi.js";
import { TGameEntities } from "../types/game.types";
import { TPerformanceTracker } from "@root/domains/performance/types/performanceTracker.types";

class Game {
	constructor() {
		this.background = new PIXI.Graphics();
		this.background.rect(0, 0, 800, 700);
		this.background.fill(0xAF4F2A);
		this.background.eventMode = "static";
		this.app.stage.addChild(this.background);
	}

	app = new PIXI.Application();

	_entities: TGameEntities = {
		characters: {
			player: null,
			monsters: [],
		},
	};

	get player () {
		if (!this._entities.characters.player) throw new Error("Missing player.");
		return this._entities.characters.player;
	}
	set player (value) {
		this._entities.characters.player = value;
	}

	get monsters () {
		return this._entities.characters.monsters;
	}
	set monsters (value) {
		this._entities.characters.monsters = value;
	}

	private _animatedSprites: TAnimatedSprites | null = null;
	get animatedSprites() {
		if (!this._animatedSprites) throw new Error("AnimatedSprites are not ready.");
		return this._animatedSprites;
	}
	set animatedSprites(value: TAnimatedSprites) {
		this._animatedSprites = value;
	}

	background: PIXI.Graphics;

	performanceTracker: TPerformanceTracker = {
		current: null,
		graphics: null,
		history: [],
	};
}

export const game = new Game();
