import { game } from "@root/domains/game/singletons/game.singletons";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { AnimatedSprite } from "pixi.js";

export class ViewManager {
	constructor(
		initialAnimatedSprite: AnimatedSprite,
		initialCoordinates: TCoordinates,
	) {
		this.animatedSprite = initialAnimatedSprite;
		this.updateSpriteCoordinates(initialCoordinates);
		game.app.stage.addChild(this.animatedSprite);
		this.animatedSprite.play();
	}

	/**
	 * Updates the sprite coordinates according to the coordinates.
	 */
	updateSpriteCoordinates = (coordinates: TCoordinates) => {
		this.animatedSprite.x = coordinates.x - this.animatedSprite.width / 2;
		this.animatedSprite.y = coordinates.y - this.animatedSprite.height / 2;
	};

	/**
	 * Replaces the current sprite with a new one, while keeping
	 * continuity (this.animatedSprite is always valid).
	 * @param key
	 */
	replaceAnimatedSprite = (key: keyof typeof game.animatedSprites) => {
		const obsoleteAnimatedSprite = this.animatedSprite;

		const newAnimatedSprite = new AnimatedSprite(game.animatedSprites[key]);
		this.animatedSprite = newAnimatedSprite;
		this.animatedSprite.x = obsoleteAnimatedSprite.x;
		this.animatedSprite.y = obsoleteAnimatedSprite.y;
		this.animatedSprite.play();
		game.app.stage.addChild(this.animatedSprite);

		obsoleteAnimatedSprite.removeFromParent();
	};

	animatedSprite: AnimatedSprite;
}