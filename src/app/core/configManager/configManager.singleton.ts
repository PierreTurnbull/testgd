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
			showsEntityCenters:               false,
			/**
			 * Sorting curves, used for displaying entities in the right order from a visual perspective.
			 */
			showsViewSortingCurves:           false,
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
			 * The coordinates of the mouse, displayed on top of the mouse.
			 */
			showsMouseCoordinates:            false,
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
		},
	};
}

export const configManager = new ConfigManager();