import { AnimatedSprite } from "pixi.js";

export type TActionProps = {
	key: string
	animatedSprite: AnimatedSprite
}

/**
 * An action performed by a character.
 */
export abstract class Action {
	constructor(props: TActionProps) {
		this.key = props.key;

		this.animatedSprite = props.animatedSprite;
		this.animatedSprite.play();
	}

	key: string;
	animatedSprite: AnimatedSprite;
}