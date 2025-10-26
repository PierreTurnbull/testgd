import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CViewSortingCurve } from "@root/app/features/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";

/**
 * Any entity that has a visual representation.
 * Sorting views helps making them appear in the correct order.
 * The location is the comparison point.
 */
export class ASortableView extends Archetype {
	constructor() {
		super([
			CViewSortingCurve,
		]);
	}
}

export const sortableViewArchetype = new ASortableView();