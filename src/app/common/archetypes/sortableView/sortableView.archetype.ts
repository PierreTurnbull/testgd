import { CViewSortingCurve } from "@root/app/domains/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { Archetype } from "../archetype.models";
import { CViewSortingCurveOffset } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";

/**
 * Any entity that has a visual representation.
 * Sorting views helps making them appear in the correct order.
 * The location is the comparison point.
 */
export class ASortableView extends Archetype {
	constructor() {
		super([
			CViewSortingCurve,
			CViewSortingCurveOffset,
		]);
	}
}

export const sortableViewArchetype = new ASortableView();