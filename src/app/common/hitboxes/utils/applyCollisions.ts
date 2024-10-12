import { Box, Response, testPolygonPolygon, Vector } from "sat";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { ACollider } from "../../archetypes/collider/collider.archetype";
import { CLocation } from "../../components/location/location.component";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { TCoordinates } from "../../types/coordinates.types";
import { Entity } from "../../entities/entity.models";

/**
 * Find collisions between the collider and other colliders and apply them by updating the collider's next coordinates.
 */
export const applyCollisions = (
	colliderEntity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const hitboxComponent = colliderEntity.getComponent(CHitbox);

	const colliderPolygon = new Box(
		new Vector(
			nextCoordinates.x - hitboxComponent.dimensions.w / 2,
			nextCoordinates.y - hitboxComponent.dimensions.h / 2,
		),
		hitboxComponent.dimensions.w,
		hitboxComponent.dimensions.h,
	).toPolygon();

	const colliderEntities = archetypeManager.getEntitiesByArchetype(ACollider);
	const collisionCandidates = colliderEntities
		.filter(collider => collider.id !== colliderEntity.id);

	for (const collisionCandidate of collisionCandidates) {
		const candidatePolygon = new Box(
			new Vector(
				collisionCandidate.getComponent(CLocation).coordinates.x - collisionCandidate.getComponent(CHitbox).dimensions.w / 2,
				collisionCandidate.getComponent(CLocation).coordinates.y - collisionCandidate.getComponent(CHitbox).dimensions.h / 2,
			),
			collisionCandidate.getComponent(CHitbox).dimensions.w,
			collisionCandidate.getComponent(CHitbox).dimensions.h,
		).toPolygon();

		const response = new Response();

		// find a collision
		testPolygonPolygon(colliderPolygon, candidatePolygon, response);

		// apply the collision by reverting the part of the motion that makes the colliders collide
		nextCoordinates.x -= response.overlapV.x;
		nextCoordinates.y -= response.overlapV.y;
		colliderPolygon.translate(-response.overlapV.x, -response.overlapV.y);
	}
};