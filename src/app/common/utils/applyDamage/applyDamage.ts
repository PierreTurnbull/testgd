import { MUDDY_BUDDY_DESTROY_DELAY } from "@root/app/domains/muddyBuddy/types/muddyBuddy.types";
import { CProjectileIsActive } from "@root/app/domains/projectile/components/projectileIsActive/projectileIsActive.component";
import { AActor } from "../../archetypes/actor/actor.archetype";
import { ADamager } from "../../archetypes/damager/damager.archetype";
import { AMortal } from "../../archetypes/mortal/mortal.archetype";
import { AProjectile } from "../../archetypes/projectile/projectile.archetype";
import { CAction } from "../../components/action/action.component";
import { CDirection } from "../../components/direction/direction.component";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CTimers } from "../../components/timers/timers.component";
import { Entity } from "../../entities/entity.models";
import { setAction } from "../setAction/setAction";

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

	const toEntityActionComponent = toEntity.getComponent(CAction);
	const toEntityDirectionComponent = toEntity.getComponent(CDirection);
	const toEntityTimersComponent = toEntity.getComponent(CTimers);
	const toEntityHitboxComponent = toEntity.getComponent(CHitbox);

	const hasDyingAction = toEntityActionComponent.availableActions.includes("dying");

	if (hasDyingAction) {
		toEntityHitboxComponent.body.isTrigger = true;

		if (toEntity.matchesArchetype(AProjectile)) {
			const projectileIsActiveComponent = toEntity.getComponent(CProjectileIsActive);

			projectileIsActiveComponent.projectileIsActive = false;
		}

		setAction(
			toEntity,
			"dying",
			toEntityDirectionComponent.direction,
			{
				onComplete: () => {
					setAction(toEntity, "dead", toEntityDirectionComponent.direction);
					const id = setTimeout(() => {
						toEntity.destroy();
					}, MUDDY_BUDDY_DESTROY_DELAY);
					toEntityTimersComponent.setTimer(id);
				},
			},
		);
	}
};