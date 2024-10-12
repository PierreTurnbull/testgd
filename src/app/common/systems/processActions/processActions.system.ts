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
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { TCoordinates } from "../../types/coordinates.types";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";

export function processActions(delta: Ticker) {
	const actorEntities = archetypeManager.getEntitiesByArchetype(AActor);

	actorEntities.forEach(actorEntity => {
		const actionComponent = actorEntity.getComponent(CAction);
		const locationComponent = actorEntity.getComponent(CLocation);
		const viewComponent = actorEntity.getComponent(CView);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);
		const hitboxComponent = actorEntity.getComponent(CHitbox);
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

			// applyCollisions(
			// 	actorEntity,
			// 	nextCoordinates,
			// );
			const nextHitboxCoordinates: TCoordinates = {
				x: nextCoordinates.x - hitboxComponent.body.width / 2,
				y: nextCoordinates.y - hitboxComponent.body.height / 2,
			};
			hitboxComponent.body.setPosition(nextHitboxCoordinates.x, nextHitboxCoordinates.y);
			// console.log(hitboxComponent.body.dirty);
			// hitboxComponent.body.updateBody();
			collisionsManager.updateBody(hitboxComponent.body);
			// console.log(hitboxComponent.body.dirty, hitboxComponent.body.x, nextCoordinates.x);

			collisionsManager.checkOne(hitboxComponent.body, (a) => console.log(a));
			collisionsManager.separateBody(hitboxComponent.body);

			applyNextCoordinates(
				nextCoordinates,
				viewComponent,
				locationComponent,
				hitboxViewComponent,
			);
		}
	});
}