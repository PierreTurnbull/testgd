import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CCollisionCandidates } from "@root/app/domains/projectile/components/collisionCandidates/collisionCandidates.component";
import { CProjectileIsActive } from "@root/app/domains/projectile/components/projectileIsActive/projectileIsActive.component";
import { CMustBeDestroyedOnCollision } from "../../../domains/projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { ADamager } from "../../archetypes/damager/damager.archetype";
import { AMortal } from "../../archetypes/mortal/mortal.archetype";
import { AProjectile } from "../../archetypes/projectile/projectile.archetype";
import { CAction } from "../../components/action/action.component";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { Entity } from "../../entities/entity.models";
import { entityManager } from "../../entities/entityManager.singleton";
import { applyDamage } from "../../utils/applyDamage/applyDamage";

/**
 * Applies collisions between projectiles and colliders.
 */
export const applyProjectileCollisions = () => {
	const projectileEntities = archetypeManager.getEntitiesByArchetype(AProjectile);

	projectileEntities.forEach(projectileEntity => {
		const hitboxComponent = projectileEntity.getComponent(CHitbox);
		const collisionCandidatesComponent = projectileEntity.getComponent(CCollisionCandidates);
		const mustBeDestroyedOnCollisionComponent = projectileEntity.getComponent(CMustBeDestroyedOnCollision);
		const projectileIsActiveComponent = projectileEntity.getComponent(CProjectileIsActive);

		// only apply projectile collisions if the projectile is active
		if (!projectileIsActiveComponent.projectileIsActive) {
			return;
		}

		const shooterEntity: Entity | null = projectileEntity.hasRelatedEntity("shooter")
			? projectileEntity.getRelatedEntity("shooter")
			: null;

		collisionsManager.system.checkOne(hitboxComponent.body, (response) => {
			if (!entityManager.getIsRegistered(projectileEntity)) {
				return;
			}

			const victim = response.b;

			if (shooterEntity) {
				const shooterHitboxComponent = shooterEntity.getComponent(CHitbox);
				const victimIsShooter = victim === shooterHitboxComponent.body;
				if (victimIsShooter) {
					// the shooter cannot shoot themself
					return;
				}
			}

			const victimEntity = collisionsManager.getEntityFromCollider(victim);

			if (victimEntity.hasComponent(CAction)) {
				const victimActionComponent = victimEntity.getComponent(CAction);

				if (victimActionComponent.currentAction === "dead" || victimActionComponent.currentAction === "dying") {
					// dead entities do not collide anymore
					return;
				}
			}

			const victimIsCandidate = collisionCandidatesComponent.collisionCandidates.some(collisionCandidate => {
				return collisionCandidate.entityMatchesArchetype(victimEntity);
			});

			if (!victimIsCandidate) {
				return;
			}

			response.clear();

			const projectileIsDamager = projectileEntity.matchesArchetype(ADamager);
			const victimIsMortal = victimEntity.matchesArchetype(AMortal);

			if (projectileIsDamager && victimIsMortal) {
				applyDamage(projectileEntity, victimEntity);
				if (mustBeDestroyedOnCollisionComponent.mustBeDestroyedOnCollision) {
					projectileEntity.destroy();
				}
			}
		});
	});
};