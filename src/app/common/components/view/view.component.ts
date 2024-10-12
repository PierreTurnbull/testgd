import { AnimatedSprite, Graphics } from "pixi.js";
import { Component } from "../component.models";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

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

	/**
	 * Border of the animated sprite. Used for debugging.
	 */
	private _border: Graphics | undefined;

	get border() {
		if (!configManager.config.debug.showsEntityBorders) throw new Error("Cannot access border: the debug option is disabled.");
		// only try to access this when _border has been initialized with a value
		if (!this._border) throw new Error("Missing border.");

		return this._border;
	}
	set border(value: Graphics) {
		this._border = value;
	}
}