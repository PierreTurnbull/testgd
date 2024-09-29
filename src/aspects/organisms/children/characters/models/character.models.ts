import { Action } from "@root/aspects/actions/models/action.models";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { Organism } from "@root/aspects/organisms/models/organism.models";
import { game } from "@root/domains/game/singletons/game.singletons";
import { TPlayerActionKey } from "@root/domains/player/types/action.types";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { AnimatedSprite } from "pixi.js";

type TCharacterProps = {
	coordinates: TCoordinates
	speed: number
	initialAction: string
}

export abstract class Character extends Organism {
	constructor(props: TCharacterProps) {
		super({
			coordinates: props.coordinates,
			initialAnimatedSprite: game.animatedSprites["characters.player.standing.down"],
		});

		this.speed = props.speed;
		this.currentAction = props.initialAction;

		this.watchInput();
	}

	/**
	 * Replaces the current action with a new one.
	 * @param actionKey 
	 * @param direction 
	 */
	replaceAction = (actionKey: Action["key"], direction: TDirection) => {
		this.direction = direction;

		this.destroySprite();

		const animatedSprite = game.animatedSprites[`characters.player.${actionKey}.${direction}`];

		this.updateSpriteCoordinates();

		game.background.addChild(animatedSprite);
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

	speed: number;

	// applyMovement(delta: number, speed: number, direction: TDirection) {
	// 	if (direction === "upLeft") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 			y: this.coordinates.y - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 		});
	// 	} else if (direction === "downLeft") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 			y: this.coordinates.y + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 		});
	// 	} else if (direction === "upRight") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 			y: this.coordinates.y - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 		});
	// 	} else if (direction === "downRight") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 			y: this.coordinates.y + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
	// 		});
	// 	} else if (direction === "left") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x - delta * speed,
	// 			y: this.coordinates.y,
	// 		});
	// 	} else if (direction === "right") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x + delta * speed,
	// 			y: this.coordinates.y,
	// 		});
	// 	} else if (direction === "up") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x,
	// 			y: this.coordinates.y - delta * speed,
	// 		});
	// 	} else if (direction === "down") {
	// 		this.setCoordinates({
	// 			x: this.coordinates.x,
	// 			y: this.coordinates.y + delta * speed,
	// 		});
	// 	}
	// }
}