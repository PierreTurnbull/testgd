import { CAction } from "../../components/action/action.component";
import { CDirection } from "../../components/direction/direction.component";
import { CKeyboard } from "../../components/keyboard/keyboard.component";
import { CLocation } from "../../components/location/location.component";
import { CVelocity } from "../../components/velocity/velocity.component";
import { CView } from "../../components/view/view.entity";
import { Archetype } from "../archetype.models";

/**
 * Any entity that can perform some actions.
 */
export class AActor extends Archetype {
	constructor() {
		super([
			CAction,
			CKeyboard,
			CDirection,
			CLocation,
			CView,
			CVelocity,
		]);
	}
}

export const actorArchetype = new AActor();