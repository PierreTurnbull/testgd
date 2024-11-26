import { logsFindPathPerformance } from "@root/app/domains/pathfinding/utils/findPath/findPath";
import { configManager } from "../configManager/configManager.singletons";
import { createLinkedNodesPerformanceTimers } from "@root/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/createLinkedNodes";

/**
 * Logs debug informations.
 */
export const logDebug = () => {
	if (
		configManager.config.debug.logsCreateLinkedNodesPerformance.total.getSomeNodeIsOnTheSegment ||
		configManager.config.debug.logsCreateLinkedNodesPerformance.total.getSegmentIntersectsWithSomeOtherSegment ||
		configManager.config.debug.logsCreateLinkedNodesPerformance.total.getPointsFormSegmentInAShape ||
		configManager.config.debug.logsCreateLinkedNodesPerformance.total.getSegmentIsInsideAShape
	) {
		console.info("createLinkedNodes rules - total times:");
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.total.getSomeNodeIsOnTheSegment) console.info(`getSomeNodeIsOnTheSegment: ${createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegment} (called ${createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegmentCount} times)`);
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.total.getSegmentIntersectsWithSomeOtherSegment) console.info(`getSegmentIntersectsWithSomeOtherSegment: ${createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegment} (called ${createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegmentCount} times)`);
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.total.getPointsFormSegmentInAShape) console.info(`getPointsFormSegmentInAShape: ${createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShape} (called ${createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShapeCount} times)`);
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.total.getSegmentIsInsideAShape) console.info(`getSegmentIsInsideAShape: ${createLinkedNodesPerformanceTimers.getSegmentIsInsideAShape} (called ${createLinkedNodesPerformanceTimers.getSegmentIsInsideAShapeCount} times)`);

		createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegment = 0;
		createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegmentCount = 0;
		createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegment = 0;
		createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegmentCount = 0;
		createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShape = 0;
		createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShapeCount = 0;
		createLinkedNodesPerformanceTimers.getSegmentIsInsideAShape = 0;
		createLinkedNodesPerformanceTimers.getSegmentIsInsideAShapeCount = 0;
	}
	if (
		configManager.config.debug.logsCreateLinkedNodesPerformance.average.getSomeNodeIsOnTheSegment ||
		configManager.config.debug.logsCreateLinkedNodesPerformance.average.getSegmentIntersectsWithSomeOtherSegment ||
		configManager.config.debug.logsCreateLinkedNodesPerformance.average.getPointsFormSegmentInAShape ||
		configManager.config.debug.logsCreateLinkedNodesPerformance.average.getSegmentIsInsideAShape
	) {
		console.info("createLinkedNodes rules - average times:");
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.average.getSomeNodeIsOnTheSegment) console.info(`getSomeNodeIsOnTheSegment: ${createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegment / createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegmentCount}`);
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.average.getSegmentIntersectsWithSomeOtherSegment) console.info(`getSegmentIntersectsWithSomeOtherSegment: ${createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegment / createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegmentCount}`);
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.average.getPointsFormSegmentInAShape) console.info(`getPointsFormSegmentInAShape: ${createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShape / createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShapeCount}`);
		if (configManager.config.debug.logsCreateLinkedNodesPerformance.average.getSegmentIsInsideAShape) console.info(`getSegmentIsInsideAShape: ${createLinkedNodesPerformanceTimers.getSegmentIsInsideAShape / createLinkedNodesPerformanceTimers.getSegmentIsInsideAShapeCount}`);

		createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegment = 0;
		createLinkedNodesPerformanceTimers.getSomeNodeIsOnTheSegmentCount = 0;
		createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegment = 0;
		createLinkedNodesPerformanceTimers.getSegmentIntersectsWithSomeOtherSegmentCount = 0;
		createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShape = 0;
		createLinkedNodesPerformanceTimers.getPointsFormSegmentInAShapeCount = 0;
		createLinkedNodesPerformanceTimers.getSegmentIsInsideAShape = 0;
		createLinkedNodesPerformanceTimers.getSegmentIsInsideAShapeCount = 0;
	}
	if (
		configManager.config.debug.logsFindPathPerformance
	) {
		console.info(`findPathPerformance - average: ${logsFindPathPerformance.findPath / logsFindPathPerformance.findPathCount}`);

		logsFindPathPerformance.findPath = 0;
		logsFindPathPerformance.findPathCount = 0;
	}
};