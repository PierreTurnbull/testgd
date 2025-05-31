import { CKnockbackDirection } from "@root/app/common/components/knockbackDirection/knockbackDirection.component";
import { KNOCKBACK_SPEED } from "@root/app/common/constants/damage.constants";
import { applyMotion } from "@root/app/common/utils/applyMotion/applyMotion";
import { Ticker } from "pixi.js";
import { actorArchetype } from "../../../common/archetypes/actor/actor.archetype";
import { CAction } from "../../../common/components/action/action.component";
import { CDirection } from "../../../common/components/direction/direction.component";
import { CLocation } from "../../../common/components/location/location.component";
import { CVelocity } from "../../../common/components/velocity/velocity.component";
import { getNextCoordinates } from "../../../common/utils/geometry/getNextCoordinates/getNextCoordinates";

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