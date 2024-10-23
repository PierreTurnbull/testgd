import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CCollisionCandidates } from "@root/app/domains/projectile/common/collisionCandidates/collisionCandidates.component";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { AProjectile } from "../../archetypes/projectile/projectile.archetype";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { entityManager } from "../../entities/entityManager.singleton";

/**
 * Applies damage to entities that collide with projectiles.
 */
export const applyProjectileDamages = () => {
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

			const target = response.b;

			const targetIsShooter = target === shooterHitboxComponent.body;
			if (targetIsShooter) {
				return;
			}

			const targetEntity = collisionsManager.getEntityFromCollider(target);

			const targetIsCandidate = collisionCandidatesComponent.collisionCandidates.some(collisionCandidate => {
				return collisionCandidate.entityMatchesArchetype(targetEntity);
			});

			if (!targetIsCandidate) {
				return;
			}

			response.clear();

			projectileEntity.destroy();
			targetEntity.destroy();
		});
	});
};