import { CCollisionCandidates } from "@root/app/domains/projectile/components/collisionCandidates/collisionCandidates.component";
import { CDirection } from "../../components/direction/direction.component";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CHitboxView } from "../../components/hitboxView/hitboxView.component";
import { CProjectile } from "../../components/identity/projectile/projectile.component";
import { CLocation } from "../../components/location/location.component";
import { CMustBeDestroyedOnCollision } from "../../../domains/projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { CVelocity } from "../../components/velocity/velocity.component";
import { Archetype } from "../archetype.models";
import { CProjectileIsActive } from "@root/app/domains/projectile/components/projectileIsActive/projectileIsActive.component";

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
			CHitbox,
			CHitboxView,
			CCollisionCandidates,
			CMustBeDestroyedOnCollision,
			CProjectileIsActive,
		]);
	}
}

export const projectileArchetype = new AProjectile();