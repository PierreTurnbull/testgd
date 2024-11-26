import { Entity } from "@root/app/common/entities/entity.models";
import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";
import { getAngleFromPoints } from "@root/app/common/utils/getAngleFromPoints/getAngleFromPoints";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { CCollisionCandidates } from "@root/app/domains/hitbox/components/collisionCandidates/collisionCandidates.component";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { System } from "detect-collisions";
import { CVisibilityGraph } from "../../../components/visibilityGraph.component";
import { getShapeSegments } from "../createShapesSegments/createShapesSegments";

const getColliders = (entity: Entity) => {
	const hitboxEntity = entity.getRelatedEntities("hitboxes").find(hitboxEntity => {
		return hitboxEntity.getComponent(CHitbox).type === "motion";
	});

	if (!hitboxEntity) {
		throw new Error("Entity has no motion hitbox.");
	}

	const collisionCandidateArchetypes = hitboxEntity.getComponent(CCollisionCandidates).collisionCandidates;
	const colliders: Entity[] = [];

	collisionCandidateArchetypes.forEach(collisionCandidateArchetype => {
		colliders.push(...collisionCandidateArchetype.entities);
	});

	return colliders;
};

/**
 * Returns the range of the angles of the collider's segments that can be compared to the current entity's segment.
 * Wraps around 360 degrees.
 */
const getRange = (t: number) => {
	const start = (t + 180) % 360;
	const end = (t + 270) % 360;

	return {
		start:       start,
		end:         end,
		wrapsAround: start >= end,
	};
};

/**
 * Returns whether n is in the range of the angles of the collider's segments that can be
 * compared to the current entity's segment.
 */
const getIsInRange = (n: number, range: ReturnType<typeof getRange>) => {
	const { start, end, wrapsAround } = range;
	if (wrapsAround) {
		return n >= start || n <= end; // Handles the wrap-around case
	} else {
		return n >= start && n <= end; // Normal range
	}
};

/**
 * Returns lists of points that represent extended hitboxes.
 * An extended hitbox is a bigger version of a hitbox that represents where the center of an entity can go.
 * The margin that is applied to make it bigger depends on the entity's size (the entity passed as parameter).
 */
export const getExtendedHitboxesPoints = (
	entity: Entity,
	colliders: Entity[],
) => {
	const hitboxEntity = entity.getRelatedEntities("hitboxes").find(hitboxEntity => {
		return hitboxEntity.getComponent(CHitbox).type === "motion";
	});

	if (!hitboxEntity) {
		throw new Error("Entity has no motion hitbox.");
	}

	const hitboxComponent = hitboxEntity.getComponent(CHitbox);

	const extendedHitboxesPoints = colliders.map(collider => {
		const colliderHitboxComponent = collider
			.getRelatedEntities("hitboxes")
			.filter(hitboxEntity => hitboxEntity.getComponent(CHitbox).type === "motion")[0]
			.getComponent(CHitbox);

		const colliderHitboxPoints = colliderHitboxComponent.body.points.map(point => {
			return {
				x: point.x + colliderHitboxComponent.body.x,
				y: point.y + colliderHitboxComponent.body.y,
			};
		});

		const extendedHitboxPoints: CVisibilityGraph["extendedHitboxesPoints"][number] = [];
		const colliderSegments = getShapeSegments(colliderHitboxPoints).sort((a, b) => {
			let angleA = getAngleFromPoints(...a);
			let angleB = getAngleFromPoints(...b);

			if (angleA < 180) angleA += 1000;
			if (angleB < 180) angleB += 1000;
		
			return angleA - angleB;
		});
		const entitySegments = getShapeSegments(hitboxComponent.body.points).sort((a, b) => getAngleFromPoints(...a) - getAngleFromPoints(...b));
		const centerOffset = ENTITIES_CENTER_OFFSETS[`characters.${entity.name}.motion.hitboxBorder`];
		if (!centerOffset) {
			throw new Error(`Missing center offsets for "${entity.name}".`);
		}
		const entityCenterSegments = entitySegments.map(segment => {
			// go in the opposite direction of the segment
			// this way, the segment represents going to the center from the corner,
			// instead of going to the corner from the center
			const pointB = {
				x: -segment[1].x + -centerOffset.x,
				y: -segment[1].y + -centerOffset.y,
			};
			const centerSegment: TSegment = [
				{ x: 0, y: 0 },
				pointB,
			];

			return centerSegment;
		});

		let colliderCursor = 0;
		let entityCursor = 0;

		// iteratively find all possible corners of the entity's hitbox, considering both the entity's shape and the collider's shape
		while (entityCursor < entitySegments.length || colliderCursor < colliderSegments.length) {
			const wrappedEntityCursor = entityCursor % entitySegments.length;
			const wrappedColliderCursor = colliderCursor % colliderSegments.length;

			const entitySegment = entitySegments[wrappedEntityCursor];
			const colliderSegment = colliderSegments[wrappedColliderCursor];
			const nextColliderSegment = colliderSegments[(wrappedColliderCursor + 1) % colliderSegments.length];

			const entitySegmentAngle = getAngleFromPoints(...entitySegment);
			const nextColliderSegmentAngle = getAngleFromPoints(...nextColliderSegment);

			const entityCenterSegment = entityCenterSegments[wrappedEntityCursor];
			const newPoint: TPoint = {
				x: colliderSegment[1].x + entityCenterSegment[1].x,
				y: colliderSegment[1].y + entityCenterSegment[1].y,
			};

			extendedHitboxPoints.push(newPoint);

			const range = getRange(entitySegmentAngle);
			const nextColliderSegmentIsInRange = getIsInRange(nextColliderSegmentAngle, range);
			const nextPointIsAligned = entitySegmentAngle === (nextColliderSegmentAngle + 90) % 360;

			// if the collider's segment is in range, then we create a corner
			if (nextColliderSegmentIsInRange && !nextPointIsAligned) {
				colliderCursor++;
			// if the collider's segment is in range and it is aligned, and the next iteration
			// will result in the entity moving in the same direction, then we iterate both, in order
			// to prevent creating 3 aligned points, as only the 2 extremities are useful
			} else if (nextColliderSegmentIsInRange && nextPointIsAligned) {
				colliderCursor++;
				entityCursor++;
			// if the collider's segment is not in range, then we try with the next entity's segment
			} else {
				entityCursor++;
			}
		}

		return extendedHitboxPoints;
	});

	return extendedHitboxesPoints;
};

/**
 * Creates a detect-collisions system for extended hitboxes.
 * This helps unblocking the pathfinding when AI entities' center is inside a shape. Theoretically,
 * this should never happen, but there is a slight margin of error when calculating new coordinates of
 * a moving entity.
 */
const createSystem = (visibilityGraphComponent: CVisibilityGraph) => {
	visibilityGraphComponent.extendedHitboxesPointsSystem = new System();
	for (let i = 0; i < visibilityGraphComponent.extendedHitboxesPoints.length; i++) {
		const extendedHitboxPoints = visibilityGraphComponent.extendedHitboxesPoints[i];
		visibilityGraphComponent.extendedHitboxesPointsSystem.createPolygon({ x: 0, y: 0 }, extendedHitboxPoints);
	}
};

/**
 * Creates lists of points that represent extended hitboxes.
 * An extended hitbox is a bigger version of a hitbox that represents where the center of an entity can go.
 * The margin that is applied to make it bigger depends on the entity's size (the entity passed as parameter).
 */
export const createExtendedHitboxesPoints = (entity: Entity) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const colliders = getColliders(entity);

	const extendedHitboxesPoints = getExtendedHitboxesPoints(entity, colliders);

	visibilityGraphComponent.extendedHitboxesPoints = extendedHitboxesPoints;

	const hitboxEntity = entity.getRelatedEntities("hitboxes").find(hitboxEntity => {
		return hitboxEntity.getComponent(CHitbox).type === "motion";
	});

	if (!hitboxEntity) {
		throw new Error("Entity has no motion hitbox.");
	}

	createSystem(visibilityGraphComponent);
};