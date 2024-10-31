import { CLocation } from "../../components/location/location.component";
import { CView } from "../../components/view/view.component";
import { Archetype } from "../archetype.models";

/**
 * Any entity that has a visual representation.
 * Sorting views helps making them appear in the correct order.
 * The location is the comparison point.
 */
export class ASortableView extends Archetype {
	constructor() {
		super([
			CLocation,
			CView,
		]);
	}
}

export const sortableViewArchetype = new ASortableView();