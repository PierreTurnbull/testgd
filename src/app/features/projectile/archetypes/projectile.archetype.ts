import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVelocity } from "@root/app/ecs/components/common/velocity.component";
import { CMustBeDestroyedOnCollision } from "@root/app/features/projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { CProjectile } from "@root/app/features/projectile/components/projectile/projectile.component";

/**
 * Any projectile.
 */
export class AProjectile extends Archetype {
	constructor() {
		super([
			CProjectile,
			CDirection,
			CLocation,
			CVelocity,
			CMustBeDestroyedOnCollision,
		]);
	}
}

export const projectileArchetype = new AProjectile();