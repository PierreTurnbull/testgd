import { AnimatedSprite } from "pixi.js";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { game } from "@root/domains/game/singletons/game.singletons";

type TOrganismProps = {
	initialCoordinates: TCoordinates
	initialAnimatedSprite: AnimatedSprite
}

export abstract class Organism {
	constructor(props: TOrganismProps) {
		this.coordinates = props.initialCoordinates;
		this.animatedSprite = props.initialAnimatedSprite;
		this.updateSpriteCoordinates();
		game.app.stage.addChild(this.animatedSprite);
		this.animatedSprite.play();
	}

	/**
	 * Sets new coordinates of the organism and updates the sprite accordingly.
	 * @param newCoordinates 
	 */
	setCoordinates = (newCoordinates: TCoordinates) => {
		this.coordinates = {
			x: newCoordinates.x,
			y: newCoordinates.y,
		};

		this.updateSpriteCoordinates();
	};
	/**
	 * Updates the sprite coordinates according to the current coordinates.
	 */
	updateSpriteCoordinates = () => {
		this.animatedSprite.x = this.coordinates.x - this.animatedSprite.width / 2;
		this.animatedSprite.y = this.coordinates.y - this.animatedSprite.height / 2;
	};

	/**
	 * Replaces the current sprite with a new one, while keeping
	 * continuity (this.animatedSprite is always valid).
	 * @param newAnimatedSprite 
	 */
	replaceAnimatedSprite = (newAnimatedSprite: AnimatedSprite) => {
		const obsoleteAnimatedSprite = this.animatedSprite;

		this.animatedSprite = newAnimatedSprite;

		obsoleteAnimatedSprite.removeFromParent();
	};

	animatedSprite: AnimatedSprite;
	direction: TDirection = "down";
	coordinates: TCoordinates;
}