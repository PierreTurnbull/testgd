import { actorArchetype } from "@root/app/ecs/archetypes/common/actor.archetype";
import { CAction } from "@root/app/ecs/components/common/action.component";
import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CKnockbackDirection } from "@root/app/ecs/components/common/knockbackDirection.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVelocity } from "@root/app/ecs/components/common/velocity.component";
import { KNOCKBACK_SPEED } from "@root/app/features/combat/constants/damage.constants";
import { applyMotion } from "@root/app/features/motion/utils/applyMotion/applyMotion";
import { Ticker } from "pixi.js";
import { getNextCoordinates } from "../../../math/utils/getNextCoordinates/getNextCoordinates";

/**
 * Applies effects based on the current actions of actors.
 */
export function processActions(delta: Ticker) {
	const actorEntities = actorArchetype.entities;

	actorEntities.forEach(actorEntity => {
		const actionComponent = actorEntity.getComponent(CAction);
		const locationComponent = actorEntity.getComponent(CLocation);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);

		if (
			actionComponent.currentAction === "running" ||
			actionComponent.currentAction === "rolling"
		) {
			const nextCoordinates = getNextCoordinates(
				delta,
				locationComponent.coordinates,
				directionComponent.direction,
				velocityComponent.velocity,
			);

			applyMotion(
				actorEntity,
				nextCoordinates,
			);
		} else if (actionComponent.currentAction === "beingHit") {
			const knockbackDirectionComponent = actorEntity.getComponent(CKnockbackDirection);
			const velocity = KNOCKBACK_SPEED * delta.deltaTime;

			const nextCoordinates = getNextCoordinates(
				delta,
				locationComponent.coordinates,
				knockbackDirectionComponent.direction,
				velocity,
			);

			applyMotion(
				actorEntity,
				nextCoordinates,
			);
		}
	});
}