import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { Graphics } from "pixi.js";
import { Component } from "../../../../common/components/component.models";

/**
 * A view that represents the sorting curve of a view.
 */
export class CViewSortingCurveView extends Component {
	constructor(
		viewSortingCurveView: Graphics | null = null,
	) {
		super();

		this._viewSortingCurveView = viewSortingCurveView;
	}
	
	/**
	 * The view that represents the sorting curve of a view. Used for debugging.
	 */
	private _viewSortingCurveView: Graphics | null = null;

	get viewSortingCurveView() {
		if (!configManager.config.debug.showsEntityCenters) throw new Error("Cannot access center: the debug option is disabled.");
		if (!this._viewSortingCurveView) throw new Error("Missing center.");

		return this._viewSortingCurveView;
	}
	set viewSortingCurveView(value: Graphics) {
		this._viewSortingCurveView = value;
	}
}