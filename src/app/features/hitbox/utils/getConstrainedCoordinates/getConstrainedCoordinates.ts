import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { collisionsManager } from "@root/app/features/collisions/singletons/collisionsManager.singleton";
import { getEntityFromCollider } from "@root/app/features/combat/systems/applyDamageCollisions/utils/getEntityFromCollider/getEntityFromCollider";
import { TCoordinates } from "../../../math/types/coordinates.types";
import { getOffsetCoordinates } from "../../../math/utils/getOffsetCoordinates/getOffsetCoordinates";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CHitboxOffset } from "../../components/hitboxOffset/hitboxOffset.component";
import { CMotionCollisionCandidates } from "../../components/motionCollisionCandidates/motionCollisionCandidates.component";
import { updateHitboxPosition } from "../updateHitboxPosition";

/**
 * Returns constrained coordinates. Coordinates are constrained based on the hitboxes of other entities.
 */
export const getConstrainedCoordinates = (
	colliderEntity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const hitboxEntities = colliderEntity.getRelatedEntities("hitboxes");
	const constrainedNextCoordinates: TCoordinates = {
		x: nextCoordinates.x,
		y: nextCoordinates.y,
	};

	hitboxEntities.forEach(hitboxEntity => {
		const hitboxComponent = hitboxEntity.getComponent(CHitbox);

		if (hitboxComponent.type !== "motion") {
			return;
		}

		const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);
		const motionCollisionCandidates = hitboxEntity.getComponent(CMotionCollisionCandidates).motionCollisionCandidates;

		const prevCoordinates: TCoordinates = {
			x: hitboxComponent.body.x,
			y: hitboxComponent.body.y,
		};
		
		const centeredCoordinates = getOffsetCoordinates(constrainedNextCoordinates, hitboxOffsetComponent.offset);

		updateHitboxPosition(hitboxComponent, centeredCoordinates);

		collisionsManager.system.checkOne(hitboxComponent.body, (response) => {
			const targetHitboxEntity = getEntityFromCollider(response.b);
			const targetEntity = targetHitboxEntity.getRelatedEntity("parent");

			// ensure that collider a can collide with collider b

			const targetIsCandidate = motionCollisionCandidates.some(motionCollisionCandidate => {
				return motionCollisionCandidate.entitiesById.has(targetEntity.id);
			});

			if (!targetIsCandidate) {
				return;
			}

			// ensure that colliders are allowed to collide

			if (response.a.isTrigger || response.b.isTrigger) {
				return;
			}

			// constrain next coordinates

			constrainedNextCoordinates.x -= response.overlapV.x;
			constrainedNextCoordinates.y -= response.overlapV.y;

			response.clear();
		});

		updateHitboxPosition(hitboxComponent, prevCoordinates);
	});

	return constrainedNextCoordinates;
};