import { Ticker } from "pixi.js";
import { AActor } from "../../archetypes/actor/actor.archetype";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { CAction } from "../../components/action/action.component";
import { CLocation } from "../../components/location/location.component";
import { applyMotion } from "../common/applyMotion/applyMotion";
import { CDirection } from "../../components/direction/direction.component";
import { CVelocity } from "../../components/velocity/velocity.component";
import { CView } from "../../components/view/view.entity";

export function processActions(delta: Ticker) {
	const actorEntities = archetypeManager.getEntitiesByArchetype(AActor);

	actorEntities.forEach(actorEntity => {
		const actionComponent = actorEntity.getComponent(CAction);
		const locationComponent = actorEntity.getComponent(CLocation);
		const viewComponent = actorEntity.getComponent(CView);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);

		if (actionComponent.currentAction === "running") {
			applyMotion(
				delta,
				viewComponent,
				locationComponent,
				directionComponent.direction,
				velocityComponent.velocity,
			);
		}
	});
}