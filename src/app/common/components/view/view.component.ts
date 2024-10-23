import { AnimatedSprite } from "pixi.js";
import { Component } from "../component.models";

/**
 * A view is the visual representation of an entity.
 */
export class CView extends Component {
	constructor(
		initialAnimatedSprite: AnimatedSprite,
	) {
		super();

		this.animatedSprite = initialAnimatedSprite;
	}

	animatedSprite: AnimatedSprite;
}