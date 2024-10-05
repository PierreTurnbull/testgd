import { AbstractEntityProcesser } from "@root/domains/entityProcesser/entityProcesser.models";
import { Player } from "../characters/player.characters";
import { Ticker } from "pixi.js";
import { getRequestedDirection } from "@root/domains/actions/logic/getRequestedDirection.logic";
import { game } from "@root/domains/game/singletons/game.singletons";

export class PlayerEntityProcesser implements AbstractEntityProcesser {
	constructor(player: Player) { 
		this.player = player;

		game.registerLoopCallback(this.processState);
	}

	player: Player;

	private applyRunning(delta: Ticker) {
		this.player.motionManager.applyMotion(delta, this.player.locationManager, this.player.locationManager.direction, this.player.runningSpeed);
		this.player.viewManager.updateSpriteCoordinates(this.player.locationManager.coordinates);
	}

	/**
	 * Translates keyboard keys into new player state.
	 */
	private processKeyboard = () => {
		// const requestedDirection = getRequestedDirection(this.player.keyboardManager.keyboard);
		// const newDirection = requestedDirection || this.player.locationManager.direction;
		// const requestsSameDirectionAsPreviously = requestedDirection === this.player.locationManager.direction;
		// const isAlreadyRunningInSameDirection = this.player.actionsManager.is("running") && requestsSameDirectionAsPreviously;
	
		const requestsAttacking = this.player.keyboardManager.keyboard.Comma;
		const requestsRunning = requestedDirection !== null;
		const requestsStanding = !requestsRunning && !requestsAttacking;

		const mustStartAttacking = (
			requestsAttacking &&
			this.player.actionsManager.actions.attacking.canStart()
		);
		const mustStartRunning = (
			requestsRunning &&
			this.player.actionsManager.actions.running.canStart() &&
			!isAlreadyRunningInSameDirection
		);
		const mustStartStanding = (
			requestsStanding &&
			this.player.actionsManager.actions.standing.canStart()
		);

		if (mustStartAttacking) {
			this.player.actionsManager.actions.attacking.start(newDirection, this.player.actionsManager.actions.standing.start);
		} else if (mustStartRunning) {
			this.player.actionsManager.actions.running.start(newDirection);
		} else if (mustStartStanding) {
			this.player.actionsManager.actions.standing.start();
		}
	};

	/**
	 * Updates the player state based on the current actions.
	 */
	private processActions = (delta: Ticker) => {
		if (this.player.actionsManager.is("running")) {
			this.applyRunning(delta);
		}
	};

	/**
	 * Updates the player state based on what changed since the previous update.
	 * This method is called every frame.
	 */
	processState = (delta: Ticker) => {
		this.processKeyboard();
		this.processActions(delta);
	};
}