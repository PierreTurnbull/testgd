import { Action } from "@root/aspects/actions/models/action.models";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { Organism } from "@root/aspects/organisms/models/organism.models";
import { game } from "@root/domains/game/singletons/game.singletons";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { AnimatedSprite, Ticker } from "pixi.js";
import { CHARACTER_DIAGONAL_MOVEMENT_FACTOR } from "../constants/movement.constants";
import { Monster1 } from "@root/domains/monster1/characters/monster1.characters";

type TCharacterProps = {
	key: string
	initialCoordinates: TCoordinates
	movementSpeed: number
	initialAction: string
	initialAnimatedSprite: AnimatedSprite
}

export abstract class Character extends Organism {
	constructor(props: TCharacterProps) {
		super({
			initialCoordinates: props.initialCoordinates,
			initialAnimatedSprite: props.initialAnimatedSprite,
		});

		this.movementSpeed = props.movementSpeed;
		this.currentAction = props.initialAction;
		this.key = props.key;

		this.watchInput();
	}

	key: string;

	/**
	 * Replaces the current action with a new one.
	 * @param actionKey 
	 * @param direction 
	 */
	replaceAction = (actionKey: Action["key"], direction: TDirection) => {
		this.direction = direction;

		const animatedSprite = game.animatedSprites[`characters.${this.key}.${actionKey}.${direction}`];
		this.replaceAnimatedSprite(animatedSprite);
		game.app.stage.addChild(animatedSprite);
		this.animatedSprite.play();
		this.currentAction = actionKey;

		this.updateSpriteCoordinates();

	};

	currentAction: string;

	/**
	 * Inputs in the format of keyboard keys.
	 */
	keyboard: Record<KeyboardEvent["code"], boolean> = {};
	/**
	 * Watch specific events such as callbacks or key presses and maps it into the keyboard input structure.
	 */
	abstract watchInput(): void

	movementSpeed: number;

	/**
	 * Apply movement to the character by updating its coordinates.
	 * @param delta 
	 */
	applyMovement(delta: Ticker) {
		if (this.direction === "upLeft") {
			this.setCoordinates({
				x: this.coordinates.x - delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y - delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
			});
		} else if (this.direction === "downLeft") {
			this.setCoordinates({
				x: this.coordinates.x - delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y + delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
			});
		} else if (this.direction === "upRight") {
			this.setCoordinates({
				x: this.coordinates.x + delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y - delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
			});
		} else if (this.direction === "downRight") {
			this.setCoordinates({
				x: this.coordinates.x + delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y + delta.deltaTime * this.movementSpeed * CHARACTER_DIAGONAL_MOVEMENT_FACTOR,
			});
		} else if (this.direction === "left") {
			this.setCoordinates({
				x: this.coordinates.x - delta.deltaTime * this.movementSpeed,
				y: this.coordinates.y,
			});
		} else if (this.direction === "right") {
			this.setCoordinates({
				x: this.coordinates.x + delta.deltaTime * this.movementSpeed,
				y: this.coordinates.y,
			});
		} else if (this.direction === "up") {
			this.setCoordinates({
				x: this.coordinates.x,
				y: this.coordinates.y - delta.deltaTime * this.movementSpeed,
			});
		} else if (this.direction === "down") {
			this.setCoordinates({
				x: this.coordinates.x,
				y: this.coordinates.y + delta.deltaTime * this.movementSpeed,
			});
		}
	}
}