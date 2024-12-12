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

		this.viewSortingCurveView = viewSortingCurveView;
	}

	viewSortingCurveView: Graphics | null;
}