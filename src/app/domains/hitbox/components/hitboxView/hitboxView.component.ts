import { Graphics } from "pixi.js";
import { Component } from "../../../../common/components/component.models";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

/**
 * The view of a hitbox, represented by a border. Used for debugging.
 */
export class CHitboxView extends Component {
	constructor(
		hitboxBorder: Graphics | null,
	) {
		super();

		this._hitboxBorder = hitboxBorder;
	}

	/**
	 * The borders of the hitbox. Used for debugging.
	 */
	private _hitboxBorder: Graphics | null;

	get hitboxBorder() {
		if (!configManager.config.debug.showsEntityHitbox) throw new Error("Cannot access hitboxBorder: the debug option is disabled.");
		if (!this._hitboxBorder) throw new Error("Missing hitboxBorder.");

		return this._hitboxBorder;
	}
	set hitboxBorder(value: Graphics) {
		this._hitboxBorder = value;
	}
}