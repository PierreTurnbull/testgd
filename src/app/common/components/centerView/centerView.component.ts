import { Graphics } from "pixi.js";
import { Component } from "../component.models";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

/**
 * The center of an entity, represented by a dot. Used for debugging.
 */
export class CCenterView extends Component {
	constructor (
		center: Graphics | null,
	) {
		super();

		this._center = center;
	}

	/**
	 * The center of an entity. Used for debugging.
	 */
	private _center: Graphics | null = null;

	get center() {
		if (!configManager.config.debug.showsEntityCenters) throw new Error("Cannot access center: the debug option is disabled.");
		if (!this._center) throw new Error("Missing center.");

		return this._center;
	}
	set center(value: Graphics) {
		this._center = value;
	}
}