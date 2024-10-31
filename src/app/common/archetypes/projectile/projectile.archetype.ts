import { CMustBeDestroyedOnCollision } from "../../../domains/projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { CDirection } from "../../components/direction/direction.component";
import { CProjectile } from "../../components/identity/projectile/projectile.component";
import { CLocation } from "../../components/location/location.component";
import { CVelocity } from "../../components/velocity/velocity.component";
import { Archetype } from "../archetype.models";

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