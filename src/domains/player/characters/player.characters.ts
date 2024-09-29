import { Character } from "@root/aspects/organisms/children/characters/models/character.models";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { PLAYER_MOVING_SPEED_PER_SECOND } from "../constants/movement.constants";
import { playerActions } from "../actions";
import { TPlayerActionKey } from "../types/action.types";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";
import debounce from "lodash/debounce";

type TPlayerProps = {
	coordinates: TCoordinates
}

export class Player extends Character { 
	constructor(props: TPlayerProps) {
		super({
			speed: PLAYER_MOVING_SPEED_PER_SECOND,
			...props,
			initialAction: "standing",
		});

		// this.replaceAction("standing", "down");
	}

	/* TODO: put this logic in the game logic */
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

	// private startRunning = () => {
	// 	this.currentAction = new actions.player.Running({
	// 		direction: this.direction,
	// 	});

	// 	this.sprite = this.currentAction.sprite;
	// };

	// private startAttacking = () => {
	// 	this.currentAction = new actions.player.Attacking({
	// 		direction: this.direction,
	// 	});

	// 	this.sprite = this.currentAction.sprite;

	// 	this.sprite.onLoop = () => this.replaceAction("standing", this.direction);
	// };

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

	// applyRunning(delta: number) {
	// 	if (!this.currentAction) throw new Error("Missing action.");

	// 	this.applyMovement(delta, this.speed, this.direction);
	// }
}