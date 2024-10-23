import { Graphics } from "pixi.js";
import { Component } from "../component.models";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

/**
 * The border of an entity. Used for debugging.
 */
export class CBorderView extends Component {
	constructor (
		border: Graphics | null,
	) {
		super();

		this._border = border;
	}

	/**
	 * The border of an entity. Used for debugging.
	 */
	private _border: Graphics | null = null;

	get border() {
		if (!configManager.config.debug.showsEntityBorders) throw new Error("Cannot access border: the debug option is disabled.");
		if (!this._border) throw new Error("Missing border.");

		return this._border;
	}
	set border(value: Graphics) {
		this._border = value;
	}
}