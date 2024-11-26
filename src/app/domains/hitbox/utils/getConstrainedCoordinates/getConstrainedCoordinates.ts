import { findOriginEntity } from "@root/app/common/utils/findOriginEntity/findOriginEntity";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { getEntityFromCollider } from "@root/app/core/systems/applyDamageCollisions/utils/getEntityFromCollider/getEntityFromCollider";
import { Entity } from "../../../../common/entities/entity.models";
import { TCoordinates } from "../../../../common/types/coordinates.types";
import { getOffsetCoordinates } from "../../../../common/utils/getOffsetCoordinates/getOffsetCoordinates";
import { CCollisionCandidates } from "../../components/collisionCandidates/collisionCandidates.component";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CHitboxOffset } from "../../components/hitboxOffset/hitboxOffset.component";
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
		const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);
		const collisionCandidatesComponent = hitboxEntity.getComponent(CCollisionCandidates);

		const prevCoordinates: TCoordinates = {
			x: hitboxComponent.body.x,
			y: hitboxComponent.body.y,
		};
		
		const centeredCoordinates = getOffsetCoordinates(constrainedNextCoordinates, hitboxOffsetComponent.offset);

		updateHitboxPosition(hitboxComponent, centeredCoordinates);

		collisionsManager.system.checkOne(hitboxComponent.body, (response) => {
			const targetEntity = getEntityFromCollider(response.b);
			
			const targetOriginEntity = findOriginEntity(targetEntity);

			const targetIsCandidate = collisionCandidatesComponent.collisionCandidates.some(collisionCandidate => {
				return collisionCandidate.entitiesById.has(targetOriginEntity.id);
			});

			if (!targetIsCandidate) {
				return;
			}

			if (response.a.isTrigger || response.b.isTrigger) {
				return;
			}

			// constrain next coordinates
			constrainedNextCoordinates.x -= response.overlapV.x;
			constrainedNextCoordinates.y -= response.overlapV.y;

			response.clear();
		});

		updateHitboxPosition(hitboxComponent, prevCoordinates);

		// idea of possible optimization: if final point not in interval of from to dest, then replace it to original point
		// this will prevent bugs where the collider teleports to the wrong coordinates
	});

	return constrainedNextCoordinates;
};