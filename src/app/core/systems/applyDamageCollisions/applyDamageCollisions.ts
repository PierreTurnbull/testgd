import { AHitbox } from "@root/app/common/archetypes/hitbox/hitbox.archetype";
import { findOriginEntity } from "@root/app/common/utils/findOriginEntity/findOriginEntity";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { CCollisionCandidates } from "@root/app/domains/hitbox/components/collisionCandidates/collisionCandidates.component";
import { CHitboxIsActive } from "@root/app/domains/hitbox/components/hitboxIsActive/hitboxIsActive.component";
import { CMustBeDestroyedOnCollision } from "@root/app/domains/projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { archetypeManager } from "../../../common/archetypes/archetypeManager.singleton";
import { ADamager } from "../../../common/archetypes/damager/damager.archetype";
import { AMortal } from "../../../common/archetypes/mortal/mortal.archetype";
import { CAction } from "../../../common/components/action/action.component";
import { applyDamage } from "../../../common/utils/applyDamage/applyDamage";
import { CHitbox } from "../../../domains/hitbox/components/hitbox/hitbox.component";
import { getEntityFromCollider } from "./utils/getEntityFromCollider/getEntityFromCollider";
import { hasParentEntity } from "./utils/hasParentEntity/hasParentEntity";

/**
 * Applies collisions between projectiles and colliders.
 */
export const applyDamageCollisions = () => {
	const hitboxEntities = archetypeManager
		.getEntitiesByArchetype(AHitbox)
		.filter(hitboxEntity => hitboxEntity.getComponent(CHitbox).type === "damage")
		.filter(hitboxEntity => hitboxEntity.hasComponent(CHitboxIsActive) && hitboxEntity.getComponent(CHitboxIsActive).hitboxIsActive);

	hitboxEntities.forEach(hitboxEntity => {
		const hitboxComponent = hitboxEntity.getComponent(CHitbox);
		const collisionCandidatesComponent = hitboxEntity.getComponent(CCollisionCandidates);

		collisionsManager.system.checkOne(hitboxComponent.body, (response) => {
			// prevent processing the hitbox if it was destroyed during a previous loop turn
			if (!hasParentEntity(response.a)) {
				return;
			}

			// get the damager and victim hitbox entities

			const damagerHitboxEntity = getEntityFromCollider(response.a);
			const victimHitboxEntity = getEntityFromCollider(response.b);

			// reset the collision response

			response.clear();

			// get the hitboxes parents.
			// eg: if a player shoots a projectile and that projectile has a damage hitbox, the projectile is the parent of the hitbox.

			const damagerEntity = damagerHitboxEntity.getRelatedEntity("parent");
			const victimEntity = victimHitboxEntity.getRelatedEntity("parent");

			// get the entities from which the damage originates.
			// eg: if a player shoots a projectile and that projectile has a damage hitbox, the player is the origin.

			const damagerOriginEntity = findOriginEntity(damagerHitboxEntity);
			const victimOriginEntity = findOriginEntity(victimHitboxEntity);

			// ensure the victim is a mortal entity

			const victimIsMortal = victimEntity.matchesArchetype(AMortal);

			if (!victimIsMortal) {
				return;
			}

			// ensure the damager is a damager entity

			const damagerIsDamager = damagerEntity.matchesArchetype(ADamager);

			if (!damagerIsDamager) {
				throw new Error("damager must be a damager.");
			}

			// prevent the damager from damaging themself or their projectiles

			if (victimOriginEntity === damagerOriginEntity) {
				return;
			}

			// some actor's actions do not trigger damage on collision

			if (victimOriginEntity.hasComponent(CAction)) {
				const victimActionComponent = victimOriginEntity.getComponent(CAction);

				if (victimActionComponent.currentAction === "beingDead" || victimActionComponent.currentAction === "dying") {
					return;
				}
			}

			// ensure the victim is among the list of collision candidates of the damager

			const victimIsCandidate = collisionCandidatesComponent.collisionCandidates.some(collisionCandidate => {
				return collisionCandidate.entityMatchesArchetype(victimOriginEntity);
			});

			if (!victimIsCandidate) {
				return;
			}

			// apply the damage

			applyDamage(damagerEntity, victimOriginEntity);

			// destroy the hitbox's parent if needed

			let mustBeDestroyedOnCollision = false;

			if (damagerEntity.hasComponent(CMustBeDestroyedOnCollision)) {
				const mustBeDestroyedOnCollisionComponent = damagerEntity.getComponent(CMustBeDestroyedOnCollision);
				mustBeDestroyedOnCollision = mustBeDestroyedOnCollisionComponent.mustBeDestroyedOnCollision;
			}

			if (mustBeDestroyedOnCollision) {
				damagerEntity.destroy();
			}
		});
	});
};