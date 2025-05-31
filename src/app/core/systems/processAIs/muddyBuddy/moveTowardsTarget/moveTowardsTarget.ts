import { CIsFindingPath } from "@root/app/common/components/isFindingPath/isFindingPath.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { TPoint } from "@root/app/common/types/point.type";
import { getAngleFromPoints } from "@root/app/common/utils/geometry/getAngleFromPoints/getAngleFromPoints";
import { getDistance } from "@root/app/common/utils/geometry/getDistance/getDistance";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CMemory } from "@root/app/domains/memory/components/memory/memory.component";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { getExtendedHitboxesPoints } from "@root/app/domains/pathfinding/utils/createVisibilityGraph/createExtendedHitboxesPoints/createExtendedHitboxesPoints";
import { getShapeSegments } from "@root/app/domains/pathfinding/utils/createVisibilityGraph/createShapesSegments/createShapesSegments";
import { findPath } from "@root/app/domains/pathfinding/utils/findPath/findPath";

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

	if (visibilityGraphComponent.nextStep) {
		const angle = getAngleFromPoints(locationComponent.coordinates, visibilityGraphComponent.nextStep);

		keyboardComponent.joystickAngle = angle;
	} else {
		keyboardComponent.joystickAngle = null;
	}
};