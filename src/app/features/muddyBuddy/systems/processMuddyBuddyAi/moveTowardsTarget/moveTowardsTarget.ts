import { CKeyboard } from "@root/app/ecs/components/common/keyboard.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TPoint } from "@root/app/features/math/types/point.type";
import { getDistance } from "@root/app/features/math/utils/getDistance/getDistance";
import { CMemory } from "@root/app/features/memory/components/memory/memory.component";
import { CIsFindingPath } from "@root/app/features/pathfinding/components/isFindingPath.component";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
import { findPath } from "@root/app/features/pathfinding/utils/findPath/findPath";
import { getExtendedHitboxesPoints } from "@root/app/features/pathfinding/utils/visibilityGraph/createVisibilityGraph/createExtendedHitboxesPoints/createExtendedHitboxesPoints";
import { getShapeSegments } from "@root/app/features/pathfinding/utils/visibilityGraph/createVisibilityGraph/createShapesSegments/createShapesSegments";
import { getNextAngle } from "./getNextAngle/getNextAngle";

export const moveTowardsTarget = (
	muddyBuddyEntity: Entity,
	playerEntity: Entity,
) => {
	const playerLocationComponent = playerEntity.getComponent(CLocation);

	const keyboardComponent = muddyBuddyEntity.getComponent(CKeyboard);
	const locationComponent = muddyBuddyEntity.getComponent(CLocation);
	const visibilityGraphComponent = muddyBuddyEntity.getComponent(CVisibilityGraph);
	const isFindingPathComponent = muddyBuddyEntity.getComponent(CIsFindingPath);
	const memoryComponent = muddyBuddyEntity.getComponent(CMemory);

	const didUpdatePathRecently = memoryComponent.memory.some(memoryItem => {
		return (
			memoryItem.type === "didUpdatePath" &&
			memoryItem.nextUpdateDate > new Date()
		);
	});
	const isReadyToFindPath = !isFindingPathComponent.isFindingPath && !didUpdatePathRecently;

	if (isReadyToFindPath) {
		const playerExtendedPoints = getExtendedHitboxesPoints(muddyBuddyEntity, [playerEntity])[0];
		const playerSegments = getShapeSegments(playerExtendedPoints);
		const playerPreciseExtendedPoints: TPoint[] = [];
		const precision = 40;

		playerSegments.forEach(playerSegment => {
			const inBetweenPoints: TPoint[] = [];

			const segmentLength = getDistance(playerSegment[0], playerSegment[1]);
			const segmentDistanceX = playerSegment[1].x - playerSegment[0].x;
			const segmentDistanceY = playerSegment[1].y - playerSegment[0].y;
			const stepsCount = Math.round(segmentLength / precision);
			const stepLengthX = segmentDistanceX / stepsCount;
			const stepLengthY = segmentDistanceY / stepsCount;

			for (let i = 0; i < stepsCount; i++) {
				const newPoint: TPoint = {
					x: playerSegment[0].x + stepLengthX * i,
					y: playerSegment[0].y + stepLengthY * i,
				};

				inBetweenPoints.push(newPoint);
			}

			playerPreciseExtendedPoints.push(...inBetweenPoints);
		});

		findPath(
			muddyBuddyEntity,
			playerLocationComponent.coordinates,
			playerPreciseExtendedPoints,
		);
	}

	if (visibilityGraphComponent.nextStep && visibilityGraphComponent.solution) {
		const nextAngle = getNextAngle(
			visibilityGraphComponent,
			locationComponent.coordinates,
		);

		keyboardComponent.joystickAngle = nextAngle;
	} else {
		keyboardComponent.joystickAngle = null;
	}
};