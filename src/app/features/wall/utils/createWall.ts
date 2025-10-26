import { actorArchetype } from "@root/app/ecs/archetypes/common/actor.archetype";
import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { relationsManager } from "@root/app/features/relation/relationsManager.singleton";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CWall } from "../components/wall/wall.component";

export const createWall = (
	initialCoordinates: TCoordinates,
	points: TPoint[],
) => {
	const entity = entityManager.createEntity("wall", [
		new CWall(),
	]);
	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: entity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	// find the center of the polygon

	const xList = points.map(point => point.x).sort((a, b) => a - b);
	const yList = points.map(point => point.y).sort((a, b) => a - b);

	const smallestX = xList[0];
	const biggestX = xList[xList.length - 1];
	const smallestY = yList[0];
	const biggestY = yList[xList.length - 1];

	const offset = {
		x: -(biggestX - smallestX) / 2,
		y: -(biggestY - smallestY) / 2,
	};

	createHitbox(entity, {
		type:                      "motion",
		motionCollisionCandidates: [actorArchetype],
		isActive:                  true,
		initialCoordinates:        initialCoordinates,
		offset:                    offset,
		name:                      "environment.wall",
		shape:                     "polygon",
		points:                    points,
	});

	return entity;
};