import { CHitbox } from "@root/app/features/hitbox/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/features/hitbox/components/hitboxView/hitboxView.component";
import { CLocation } from "../../components/common/location.component";
import { Archetype } from "../models/archetype.models";

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