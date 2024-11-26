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
			showsEntityHitboxes:              true,
			/**
			 * Centers of entities, which means their location.
			 */
			showsEntityCenters:               true,
			/**
			 * Bigger version of hitboxes. They are used for creating visibility graphs, in the context of pathfinding.
			 */
			showsExtendedHitboxes:            true,
			/**
			 * Nodes of visibility graphs, in the context of pathfinding.
			 */
			showsVisibilityGraphNodes:        true,
			/**
			 * Available paths in a visibility graph, in the context of pathfinding.
			 */
			showsVisibilityGraphNodeLinks:    true,
			/**
			 * The best path of a visibility graph, using a pathfinding algorithm.
			 */
			showsVisibilityGraphBestPath:     true,
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