import { TMonster1Action } from "@domains/_/types/action/monster1/action.type";
import { TDirection } from "@domains/_/types/action/direction.type";
import { Character } from "@root/aspects/organisms/children/characters/models/character.models";

type TMonster1Props = {
	// coordinates: TCoordinates
}

export class Monster1 extends Character/*<TMonster1Action>*/ {
	constructor(props: TMonster1Props) {
		super({
			...props,
			speed: 8,
		});

		// this.replaceAction("standing", "down");
	}

	// watchInput() {
	// 	setInterval(() => {
	// 		if (this.keyboard.KeyA) this.keyboard = { KeyD: true, KeyS: true };
	// 		else this.keyboard = { KeyA: true, KeyW: true };
	// 	}, 1000);
	// }

	// replaceAction = (newActionKey: TMonster1Action["key"], direction: TDirection) => {
	// 	this.beforeReplaceAction();

	// 	if (newActionKey === "standing") this.stand(direction);
	// 	if (newActionKey === "rolling") this.roll(direction);

	// 	this.direction = direction;

	// 	this.afterReplaceAction();
	// };

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
	// get canRoll() {
	// 	return this.isStanding || this.isRolling;
	// }

	// get isStanding() { return this.currentAction instanceof actions.monster1.Standing; }
	// get isRolling() { return this.currentAction instanceof actions.monster1.Rolling; }

	// applyRolling(delta: number) {
	// 	if (!this.currentAction) throw new Error("Missing action.");

	// 	this.applyMovement(delta, this.speed, this.direction);
	// }
}