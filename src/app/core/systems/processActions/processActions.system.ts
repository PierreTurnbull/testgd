import { Ticker } from "pixi.js";
import { AActor } from "../../../common/archetypes/actor/actor.archetype";
import { archetypeManager } from "../../../common/archetypes/archetypeManager.singleton";
import { CAction } from "../../../common/components/action/action.component";
import { CDirection } from "../../../common/components/direction/direction.component";
import { CLocation } from "../../../common/components/location/location.component";
import { CVelocity } from "../../../common/components/velocity/velocity.component";
import { getConstrainedCoordinates } from "../../../domains/hitbox/utils/getConstrainedCoordinates/getConstrainedCoordinates";
import { applyNextCoordinates } from "../../../common/utils/applyNextCoordinates/applyNextCoordinates";
import { getNextCoordinates } from "../../../common/utils/getNextCoordinates/getNextCoordinates";

/**
 * Applies effects based on the current actions of actors.
 */
export function processActions(delta: Ticker) {
	const actorEntities = archetypeManager.getEntitiesByArchetype(AActor);

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

			const constrainedNextCoordinates = getConstrainedCoordinates(
				actorEntity,
				nextCoordinates,
			);

			applyNextCoordinates(
				actorEntity,
				constrainedNextCoordinates,
			);
		}
	});
}