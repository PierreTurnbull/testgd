class ConfigManager {
	config = {
		debug: {
			/**
			 * Borders of images that are used to display entities.
			 */
			showsEntityBorders:               false,
			/**
			 * Hitboxes of entities.
			 */
			showsEntityHitboxes:              false,
			/**
			 * Centers of entities, which means their location.
			 */
			showsEntityCenters:               false,
			/**
			 * Bigger version of hitboxes. They are used for creating visibility graphs, in the context of pathfinding.
			 */
			showsExtendedHitboxes:            false,
			/**
			 * Nodes of visibility graphs, in the context of pathfinding.
			 */
			showsVisibilityGraphNodes:        false,
			/**
			 * Available paths in a visibility graph, in the context of pathfinding.
			 */
			showsVisibilityGraphNodeLinks:    false,
			/**
			 * The best path of a visibility graph, using a pathfinding algorithm.
			 */
			showsVisibilityGraphBestPath:     false,
			/**
			 * Logs the performance of updating visiblity graphs.
			 */
			logsCreateLinkedNodesPerformance: {
				total: {
					getSomeNodeIsOnTheSegment:                false,
					getSegmentIntersectsWithSomeOtherSegment: false,
					getPointsFormSegmentInAShape:             false,
					getSegmentIsInsideAShape:                 false,
				},
				average: {
					getSomeNodeIsOnTheSegment:                false,
					getSegmentIntersectsWithSomeOtherSegment: false,
					getPointsFormSegmentInAShape:             false,
					getSegmentIsInsideAShape:                 false,
				},
			},
			logsFindPathPerformance: false,
		},
	};
}

export const configManager = new ConfigManager();