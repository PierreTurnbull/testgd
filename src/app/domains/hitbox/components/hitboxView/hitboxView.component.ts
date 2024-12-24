import { Graphics } from "pixi.js";
import { Component } from "../../../../common/components/component.models";
import { configManager } from "@root/app/core/configManager/configManager.singleton";

/**
 * The view of a hitbox, represented by a border. Used for debugging.
 */
export class CHitboxView extends Component {
	constructor(
		hitboxBorderView: Graphics | null,
	) {
		super();

		this._hitboxBorderView = hitboxBorderView;
	}

	private _hitboxBorderView: Graphics | null;

	get hitboxBorderView() {
		if (!configManager.config.debug.showsEntityHitboxes) throw new Error("Cannot access hitboxBorderView: the debug option is disabled.");
		if (!this._hitboxBorderView) throw new Error("Missing hitboxBorderView.");

		return this._hitboxBorderView;
	}
	set hitboxBorderView(value: Graphics) {
		this._hitboxBorderView = value;
	}
}