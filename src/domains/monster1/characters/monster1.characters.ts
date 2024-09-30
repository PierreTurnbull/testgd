import { TDirection } from "@root/aspects/actions/types/actions.types";
import { Character } from "@root/aspects/organisms/children/characters/models/character.models";
import { game } from "@root/domains/game/singletons/game.singletons";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { Ticker } from "pixi.js";
import { MONSTER1_MOVING_SPEED } from "../constants/movement.constants";

type TMonster1Props = {
	initialCoordinates: TCoordinates
}

export class Monster1 extends Character {
	constructor(props: TMonster1Props) {
		super({
			key: "monster1",
			initialCoordinates: props.initialCoordinates,
			movementSpeed: MONSTER1_MOVING_SPEED,
			initialAction: "standing",
			initialAnimatedSprite: game.animatedSprites["characters.monster1.standing.down"],
		});
	}

	watchInput() {
		// todo : clean this interval
		setInterval(() => {
			if (this.keyboard.KeyA) this.keyboard = {
				KeyD: true,
				KeyS: true, 
			};
			else this.keyboard = {
				KeyA: true,
				KeyW: true, 
			};
		}, 1000);
	}

	startStanding = (direction: TDirection) => {
		this.replaceAction("standing", direction);
	};

	startRolling = (direction: TDirection) => {
		this.replaceAction("rolling", direction);
	};

	// private stand = (direction: TDirection) => {
	// 	this.currentAction = new actions.monster1.Standing({
	// 		direction: direction,
	// 	});

	// 	this.sprite = this.currentAction.sprite;
	// };

	// private roll = (direction: TDirection) => {
	// 	this.currentAction = new actions.monster1.Rolling({
	// 		direction: direction,
	// 	});

	// 	this.sprite = this.currentAction.sprite;
	// };

	// get canStand() {
	// 	if (this.isStanding) return false;

	// 	return this.isRolling;
	// }

	get canStartStanding() {
		const canStartStanding = (
			this.isRolling
		);
		
		return canStartStanding;
	}
	get canStartRolling() {
		const canStartRolling = (
			this.isStanding ||
			this.isRolling
		);

		return canStartRolling;
	}

	get isStanding() { return this.currentAction === "standing"; }
	get isRolling() { return this.currentAction === "rolling"; }

	applyRolling(delta: Ticker) {
		this.applyMovement(delta);
	}
}