import { CHitbox } from "../../../domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxView } from "../../../domains/hitbox/components/hitboxView/hitboxView.component";
import { CLocation } from "../../components/location/location.component";
import { Archetype } from "../archetype.models";

/**
 * Any entity that has a hitbox.
 */
export class ACollider extends Archetype {
	constructor() {
		super([
			CLocation,
			CHitbox,
			CHitboxView,
		]);
	}
}

export const colliderArchetype = new ACollider();