import { AnimatedSprite } from "pixi.js";
import { Component } from "../component.models";

/**
 * A view is the visual representation of an entity.
 */
export class CView extends Component {
	private _animatedSprite: AnimatedSprite | undefined;

	get animatedSprite() {
		if (!this._animatedSprite) throw new Error("Missing animatedSprite.");

		return this._animatedSprite;
	}
	set animatedSprite(value: AnimatedSprite) {
		this._animatedSprite = value;
	}
}