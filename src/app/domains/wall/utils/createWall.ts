import { CWall } from "@root/app/common/components/identity/wall.component";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { actorArchetype } from "@root/app/common/archetypes/actor/actor.archetype";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";

export const createWall = (
	initialCoordinates: TCoordinates,
	points: TPoint[],
) => {
	const entity = createEntity("wall", [
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
		type:                "motion",
		collisionCandidates: [actorArchetype],
		isActive:            true,
		initialCoordinates:  initialCoordinates,
		offset:              offset,
		name:                "environment.wall",
		shape:               "polygon",
		points:              points,
	});

	return entity;
};