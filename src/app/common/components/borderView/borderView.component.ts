import { Graphics } from "pixi.js";
import { Component } from "../component.models";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

/**
 * The border of an entity. Used for debugging.
 */
export class CBorderView extends Component {
	constructor (
		borderView: Graphics | null,
	) {
		super();

		this._borderView = borderView;
	}

	/**
	 * The border of an entity. Used for debugging.
	 */
	private _borderView: Graphics | null = null;

	get borderView() {
		if (!configManager.config.debug.showsEntityBorders) throw new Error("Cannot access border view: the debug option is disabled.");
		if (!this._borderView) throw new Error("Missing border view.");

		return this._borderView;
	}
	set borderView(value: Graphics) {
		this._borderView = value;
	}
}