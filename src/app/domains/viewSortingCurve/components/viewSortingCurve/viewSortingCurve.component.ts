import { TViewSortingCurve } from "../../types/viewSortingCurve.types";
import { Component } from "../../../../common/components/component.models";

/**
 * A curve that represents, for each point on x, the point on y from which another entity is behind this one.
 * This is used for sorting views in order to make them coherent visually.
 */
export class CViewSortingCurve extends Component {
	constructor(
		viewSortingCurve: TViewSortingCurve,
	) {
		super();

		this.viewSortingCurve = viewSortingCurve;
	}

	viewSortingCurve: TViewSortingCurve;
}