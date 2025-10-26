import { CBorderView } from "@root/app/features/view/components/borderView.component";
import { CCenterView } from "@root/app/features/view/components/centerView.component";
import { CView } from "@root/app/features/view/components/view.component";
import { CViewSortingCurve } from "@root/app/features/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CAction } from "../../components/common/action.component";
import { CDirection } from "../../components/common/direction.component";
import { CKeyboard } from "../../components/common/keyboard.component";
import { CLocation } from "../../components/common/location.component";
import { CVelocity } from "../../components/common/velocity.component";
import { Archetype } from "../models/archetype.models";

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
			CVelocity,
			CView,
			CBorderView,
			CCenterView,
			CViewSortingCurve,
		]);
	}
}

export const actorArchetype = new AActor();