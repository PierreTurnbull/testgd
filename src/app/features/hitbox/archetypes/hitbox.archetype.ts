import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CHitbox } from "@root/app/features/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/features/hitbox/components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "@root/app/features/hitbox/components/hitboxView/hitboxView.component";

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