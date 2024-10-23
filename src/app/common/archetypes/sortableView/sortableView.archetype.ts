import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CView } from "../../components/view/view.component";
import { Archetype } from "../archetype.models";

/**
 * Any entity that has a visual representation and a hitbox.
 * Sorting views helps making them appear in the correct order.
 * The hitbox is the comparison point.
 */
export class ASortableView extends Archetype {
	constructor() {
		super([
			CView,
			CHitbox,
		]);
	}
}

export const sortableViewArchetype = new ASortableView();