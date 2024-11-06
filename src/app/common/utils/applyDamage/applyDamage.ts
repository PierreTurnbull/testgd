import { CHitboxIsActive } from "@root/app/domains/hitbox/components/hitboxIsActive/hitboxIsActive.component";
import { MUDDY_BUDDY_DESTROY_DELAY } from "@root/app/domains/muddyBuddy/types/muddyBuddy.types";
import { ColorMatrixFilter } from "pixi.js";
import { CHitbox } from "../../../domains/hitbox/components/hitbox/hitbox.component";
import { AActor } from "../../archetypes/actor/actor.archetype";
import { ADamager } from "../../archetypes/damager/damager.archetype";
import { AMortal } from "../../archetypes/mortal/mortal.archetype";
import { CDamage } from "../../components/damage/damage.component";
import { CDirection } from "../../components/direction/direction.component";
import { CHealth } from "../../components/health/health.component";
import { CKnockbackDirection } from "../../components/knockbackDirection/knockbackDirection.component";
import { CLocation } from "../../components/location/location.component";
import { CPostHitInvincibility } from "../../components/postHitInvincibility/postHitInvincibility.component";
import { CTimers } from "../../components/timers/timers.component";
import { CView } from "../../components/view/view.component";
import { ANGLES_RANGE, DIRECTIONS, MAIN_ANGLES } from "../../constants/space.constants";
import { Entity } from "../../entities/entity.models";
import { getAngleFromPoints } from "../getAngleFromPoints/getAngleFromPoints";
import { setAction } from "../setAction/setAction";
import { FLASH_DURATION } from "../../constants/damage.constants";
import { CProjectile } from "../../components/identity/projectile/projectile.component";

/**
 * Applies damage of the damager to the victim
 */
export const applyDamage = (
	fromEntity: Entity,
	toEntity: Entity,
) => {
	const fromEntityIsDamager = fromEntity.matchesArchetype(ADamager);
	const toEntityIsMortal = toEntity.matchesArchetype(AMortal);

	if (!fromEntityIsDamager || !toEntityIsMortal) {
		if (!fromEntityIsDamager) {
			throw new Error("fromEntity must be a damager.");
		}
		if (!toEntityIsMortal) {
			throw new Error("toEntity must be a mortal.");
		}
	}

	const toEntityIsActor = toEntity.matchesArchetype(AActor);

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
		const closestAngle = Math.round(angle / ANGLES_RANGE) * ANGLES_RANGE;
		const angleKey = MAIN_ANGLES.indexOf(closestAngle === 360 ? 0 : closestAngle);
		const direction = DIRECTIONS[angleKey];
		toEntity.addComponent(new CKnockbackDirection(direction));

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
		if (toEntity.hasRelation("projectiles")) {
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
	toEntityViewComponent.animatedSprite.filters = [colorMatrix];
	colorMatrix.brightness(Infinity, false);

	const timersComponent = toEntity.getComponent(CTimers);
	const id = setTimeout(() => {
		toEntityViewComponent.animatedSprite.filters = [];
	}, FLASH_DURATION);
	timersComponent.addTimer(id);
};