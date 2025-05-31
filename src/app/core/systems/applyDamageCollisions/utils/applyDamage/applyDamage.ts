import { CHitboxIsActive } from "@root/app/domains/hitbox/components/hitboxIsActive/hitboxIsActive.component";
import { CMemory } from "@root/app/domains/memory/components/memory/memory.component";
import { MUDDY_BUDDY_DESTROY_DELAY } from "@root/app/domains/muddyBuddy/types/muddyBuddy.types";
import { CProjectile } from "@root/app/domains/projectile/components/projectile/projectile.component";
import { ColorMatrixFilter } from "pixi.js";
import { actorArchetype } from "../../../../../common/archetypes/actor/actor.archetype";
import { damagerArchetype } from "../../../../../common/archetypes/damager/damager.archetype";
import { mortalArchetype } from "../../../../../common/archetypes/mortal/mortal.archetype";
import { playerArchetype } from "../../../../../common/archetypes/player/player.archetype";
import { CDamage } from "../../../../../common/components/damage/damage.component";
import { CDirection } from "../../../../../common/components/direction/direction.component";
import { CHealth } from "../../../../../common/components/health/health.component";
import { CKnockbackDirection } from "../../../../../common/components/knockbackDirection/knockbackDirection.component";
import { CLocation } from "../../../../../common/components/location/location.component";
import { CPostHitInvincibility } from "../../../../../common/components/postHitInvincibility/postHitInvincibility.component";
import { CTimers } from "../../../../../common/components/timers/timers.component";
import { CView } from "../../../../../common/components/view/view.component";
import { FLASH_DURATION } from "../../../../../common/constants/damage.constants";
import { getAngleFromPoints } from "../../../../../common/utils/geometry/getAngleFromPoints/getAngleFromPoints";
import { setAction } from "../../../../../common/utils/setAction/setAction";
import { Entity } from "../../../../../domains/entity/entity.models";
import { CHitbox } from "../../../../../domains/hitbox/components/hitbox/hitbox.component";

/**
 * Applies damage of the damager to the victim
 */
export const applyDamage = (
	fromEntity: Entity,
	toEntity: Entity,
) => {
	const fromEntityIsDamager = damagerArchetype.entityMatchesArchetype(fromEntity);
	const toEntityIsMortal = mortalArchetype.entityMatchesArchetype(toEntity);
	const toEntityIsPlayer = playerArchetype.entityMatchesArchetype(toEntity);

	if (!fromEntityIsDamager || !toEntityIsMortal) {
		if (!fromEntityIsDamager) {
			throw new Error("fromEntity must be a damager.");
		}
		if (!toEntityIsMortal) {
			throw new Error("toEntity must be a mortal.");
		}
	}

	const toEntityIsActor = actorArchetype.entityMatchesArchetype(toEntity);

	if (!toEntityIsActor) {
		throw new Error("toEntity must be an actor.");
	}

	const toEntityDirectionComponent = toEntity.getComponent(CDirection);
	const toEntityTimersComponent = toEntity.getComponent(CTimers);
	const toEntityHealthComponent = toEntity.getComponent(CHealth);
	const toEntityPostHitInvincibilityComponent = toEntity.getComponent(CPostHitInvincibility);
	const toEntityViewComponent = toEntity.getComponent(CView);

	const fromEntityDamageComponent = fromEntity.getComponent(CDamage);

	if (toEntityPostHitInvincibilityComponent.isInvincible) {
		return;
	}

	toEntityHealthComponent.health = Math.max(toEntityHealthComponent.health - fromEntityDamageComponent.damage, 0);

	if (toEntityHealthComponent.health === 0) {
		// deactivate the hitboxes of the victim
		const toEntityHitboxEntities = toEntity.getRelatedEntities("hitboxes");

		toEntityHitboxEntities.forEach(hitboxEntity => {
			const hitboxComponent = hitboxEntity.getComponent(CHitbox);

			hitboxComponent.body.isTrigger = true;

			if (hitboxEntity.hasComponent(CHitboxIsActive)) {
				const hitboxIsActiveComponent = hitboxEntity.getComponent(CHitboxIsActive);

				hitboxIsActiveComponent.hitboxIsActive = false;
			}
		});

		// set action
		setAction(
			toEntity,
			"dying",
			toEntityDirectionComponent.direction,
			{
				onComplete: () => {
					setAction(toEntity, "beingDead", toEntityDirectionComponent.direction);

					if (toEntityIsPlayer) return;

					const id = setTimeout(() => {
						toEntity.destroy();
					}, MUDDY_BUDDY_DESTROY_DELAY);
					toEntityTimersComponent.addTimer(id);
				},
			},
		);
	} else {
		// set knockback angle
		const fromCenterComponent = fromEntity.getComponent(CLocation);
		const toCenterComponent = toEntity.getComponent(CLocation);
		const angle = getAngleFromPoints(fromCenterComponent.coordinates, toCenterComponent.coordinates);
		toEntity.addComponent(new CKnockbackDirection(angle));

		// set action
		setAction(toEntity, "beingHit", toEntityDirectionComponent.direction, {
			onComplete: () => {
				setAction(toEntity, "standing", toEntityDirectionComponent.direction);
				toEntity.removeComponent(CKnockbackDirection);
			},
		});

		// set invincibility
		toEntityPostHitInvincibilityComponent.setInvincibility();

		// remove the victim's slash projectiles
		if (toEntity.relations.has("projectiles")) {
			const projectileEntities = toEntity.getRelatedEntities("projectiles");
			projectileEntities
				.filter(projectileEntity => projectileEntity.getComponent(CProjectile).type === "slash")
				.forEach(projectileEntity => {
					projectileEntity.destroy();
				});
		}
	}

	// set flash effect
	const colorMatrix = new ColorMatrixFilter();
	toEntityViewComponent.view.filters = [colorMatrix];
	colorMatrix.brightness(Infinity, false);

	const timersComponent = toEntity.getComponent(CTimers);
	const id = setTimeout(() => {
		toEntityViewComponent.view.filters = [];
	}, FLASH_DURATION);
	timersComponent.addTimer(id);

	// udpate damager's memory

	if (fromEntity.hasComponent(CMemory)) {
		const memoryComponent = fromEntity.getComponent(CMemory);

		memoryComponent.addMemoryItem({
			type:   "didHit",
			victim: toEntity,
		});
	}
};