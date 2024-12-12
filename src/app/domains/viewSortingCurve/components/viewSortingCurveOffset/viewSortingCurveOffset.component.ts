import { TOffset } from "../../../../common/types/offset.types";
import { Component } from "../../../../common/components/component.models";

/**
 * The offset of a view sorting curve.
 */
export class CViewSortingCurveOffset extends Component {
	constructor(
		viewSortingCurveOffset: TOffset,
	) {
		super();

		this.viewSortingCurveOffset = viewSortingCurveOffset;
	}

	viewSortingCurveOffset: TOffset;
}