import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CCollisionCandidates } from "@root/app/domains/projectile/common/collisionCandidates/collisionCandidates.component";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { AProjectile } from "../../archetypes/projectile/projectile.archetype";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { entityManager } from "../../entities/entityManager.singleton";
import { applyDamage } from "../../utils/applyDamage/applyDamage";
import { ADamager } from "../../archetypes/damager/damager.archetype";
import { AMortal } from "../../archetypes/mortal/mortal.archetype";
import { CAction } from "../../components/action/action.component";

/**
 * Applies collisions between projectiles and colliders.
 */
export const applyProjectileCollisions = () => {
	const projectileEntities = archetypeManager.getEntitiesByArchetype(AProjectile);

	projectileEntities.forEach(projectileEntity => {
		const hitboxComponent = projectileEntity.getComponent(CHitbox);
		const collisionCandidatesComponent = projectileEntity.getComponent(CCollisionCandidates);

		const shooterEntity = projectileEntity.getRelatedEntity("shooter");
		const shooterHitboxComponent = shooterEntity.getComponent(CHitbox);

		collisionsManager.system.checkOne(hitboxComponent.body, (response) => {
			if (!entityManager.getIsRegistered(projectileEntity)) {
				return;
			}

			const victim = response.b;

			const victimIsShooter = victim === shooterHitboxComponent.body;
			if (victimIsShooter) {
				// the shooter cannot shoot themself
				return;
			}

			const victimEntity = collisionsManager.getEntityFromCollider(victim);

			if (victimEntity.hasComponent(CAction)) {
				const victimActionComponent = victimEntity.getComponent(CAction);

				if (victimActionComponent.currentAction === "dead") {
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
			}
		});
	});
};