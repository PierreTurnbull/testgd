import { AnimatedSprite, Graphics } from "pixi.js";
import { Component } from "../component.models";

/**
 * A view is the visual representation of an entity.
 */
export class CView extends Component {
	private _animatedSprite: AnimatedSprite | undefined;

	get animatedSprite() {
		// only try to access this when _animatedSprite has been initialized with a value
		if (!this._animatedSprite) throw new Error("Missing animatedSprite.");

		return this._animatedSprite;
	}
	set animatedSprite(value: AnimatedSprite) {
		this._animatedSprite = value;
	}

	private _animatedSpriteBorder: Graphics | undefined;

	get animatedSpriteBorder() {
		// only try to access this when showsEntityBorders is true
		if (!this._animatedSpriteBorder) throw new Error("Missing animatedSpriteBorder.");

		return this._animatedSpriteBorder;
	}
	set animatedSpriteBorder(value: Graphics) {
		this._animatedSpriteBorder = value;
	}
}