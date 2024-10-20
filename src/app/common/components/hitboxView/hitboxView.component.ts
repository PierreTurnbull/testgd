import { Graphics } from "pixi.js";
import { Component } from "../component.models";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

export class CHitboxView extends Component {
	/**
	 * The borders of the hitbox. Used for debugging.
	 */
	private _hitboxBorder: Graphics | undefined;

	get hitboxBorder() {
		if (!configManager.config.debug.showsEntityHitbox) throw new Error("Cannot access hitboxBorder: the debug option is disabled.");
		// only try to access this when _hitboxBorder has been initialized with a value
		if (!this._hitboxBorder) throw new Error("Missing hitboxBorder.");

		return this._hitboxBorder;
	}
	set hitboxBorder(value: Graphics) {
		this._hitboxBorder = value;
	}
}