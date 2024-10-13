import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CView } from "../../components/view/view.component";
import { Archetype } from "../archetype.models";

/**
 * Any entity that has a visual representation.
 */
export class AOrderableView extends Archetype {
	constructor() {
		super([
			CView,
			CHitbox,
		]);
	}
}

export const orderableViewArchetype = new AOrderableView();