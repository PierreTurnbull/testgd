import { Ticker } from "pixi.js";
import { AActor } from "../../archetypes/actor/actor.archetype";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { CAction } from "../../components/action/action.component";
import { CDirection } from "../../components/direction/direction.component";
import { CHitboxView } from "../../components/hitboxView/hitboxView.component";
import { CLocation } from "../../components/location/location.component";
import { CVelocity } from "../../components/velocity/velocity.component";
import { CView } from "../../components/view/view.component";
import { applyCollisions } from "../../hitboxes/utils/applyCollisions";
import { applyNextCoordinates } from "../../utils/applyNextCoordinates/applyNextCoordinates";
import { getNextCoordinates } from "../../utils/getNextCoordinates/getNextCoordinates";

export function processActions(delta: Ticker) {
	const actorEntities = archetypeManager.getEntitiesByArchetype(AActor);

	actorEntities.forEach(actorEntity => {
		const actionComponent = actorEntity.getComponent(CAction);
		const locationComponent = actorEntity.getComponent(CLocation);
		const viewComponent = actorEntity.getComponent(CView);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);
		const hitboxViewComponent = actorEntity.getComponent(CHitboxView);

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

			applyCollisions(
				actorEntity,
				nextCoordinates,
			);

			applyNextCoordinates(
				nextCoordinates,
				viewComponent,
				locationComponent,
				hitboxViewComponent,
			);
		}
	});
}