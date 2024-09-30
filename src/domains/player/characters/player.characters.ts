import { TDirection } from "@root/aspects/actions/types/actions.types";
import { Character } from "@root/aspects/organisms/children/characters/models/character.models";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import debounce from "lodash/debounce";
import { Ticker } from "pixi.js";
import { PLAYER_MOVING_SPEED } from "../constants/movement.constants";
import { game } from "@root/domains/game/singletons/game.singletons";

type TPlayerProps = {
	initialCoordinates: TCoordinates
}

export class Player extends Character { 
	constructor(props: TPlayerProps) {
		super({
			key: "player",
			initialCoordinates: props.initialCoordinates,
			movementSpeed: PLAYER_MOVING_SPEED,
			initialAction: "standing",
			initialAnimatedSprite: game.animatedSprites["characters.player.standing.down"],
		});
	}

	// todo: actions property with sprite, key and other infos ?

	watchInput() {
		const resetKey = debounce((keyCode: string) => {
			this.keyboard[keyCode] = false;
		}, 250);

		window.onkeydown = event => {
			resetKey(event.code);

			this.keyboard[event.code] = true;
		};

		window.onkeyup = event => {
			this.keyboard[event.code] = false;
		};
	}

	startStanding = (direction: TDirection) => {
		this.replaceAction("standing", direction);
	};

	startRunning = (direction: TDirection) => {
		this.replaceAction("running", direction);
	};

	startAttacking = (direction: TDirection) => {
		this.replaceAction("attacking", direction);
		this.animatedSprite.onLoop = () => this.replaceAction("standing", this.direction);
	};

	get canStartStanding() {
		const canStartStanding = (
			this.isRunning
		);
		
		return canStartStanding;
	}
	get canStartRunning() {
		const canStartRunning = (
			this.isStanding ||
			this.isRunning
		);

		return canStartRunning;
	}
	get canStartAttacking() {
		const canStartAttacking = (
			this.isRunning ||
			this.isStanding
		);

		return canStartAttacking;
	}

	get isStanding() { return this.currentAction === "standing"; }
	get isRunning() { return this.currentAction === "running"; }
	get isAttacking() { return this.currentAction === "attacking"; }

	applyRunning(delta: Ticker) {
		this.applyMovement(delta);
	}
}