import { ViewContainer } from "pixi.js";
import { Component } from "../../../ecs/components/models/component.models";

/**
 * A view is the visual representation of an entity.
 */
export class CView extends Component {
	constructor (
		view: ViewContainer | null,
	) {
		super();

		this._view = view;
	}

	private _view: ViewContainer | null = null;

	get view() {
		if (!this._view) throw new Error("Missing border view.");

		return this._view;
	}
	set view(value: ViewContainer) {
		this._view = value;
	}
}