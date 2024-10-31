import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/domains/hitbox/components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { Archetype } from "../archetype.models";

/**
 * Hitboxes.
 */
export class AHitbox extends Archetype {
	constructor() {
		super([
			CHitbox,
			CHitboxOffset,
			CHitboxView,
		]);
	}
}

export const hitboxArchetype = new AHitbox();