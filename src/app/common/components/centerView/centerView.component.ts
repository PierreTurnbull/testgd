import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { Graphics } from "pixi.js";
import { Component } from "../component.models";

/**
 * The center of an entity, represented by a dot. Used for debugging.
 */
export class CCenterView extends Component {
	constructor (
		centerView: Graphics | null,
	) {
		super();

		this._centerView = centerView;
	}

	/**
	 * The view of the center of an entity. Used for debugging.
	 */
	private _centerView: Graphics | null = null;

	get centerView() {
		if (!configManager.config.debug.showsEntityCenters) throw new Error("Cannot access center: the debug option is disabled.");
		if (!this._centerView) throw new Error("Missing center.");

		return this._centerView;
	}
	set centerView(value: Graphics) {
		if (!configManager.config.debug.showsEntityCenters) throw new Error("Cannot access center: the debug option is disabled.");
		this._centerView = value;
	}
}