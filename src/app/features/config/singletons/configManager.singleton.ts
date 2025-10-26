import { data as editorData } from "@root/app/features/editor/data/data";
import { TConfig } from "../../editor/data/data.types";

class ConfigManager {
	config: Pick<TConfig, "debug"> = {
		debug: {
			/**
			 * Borders of images that are used to display entities.
			 */
			showsEntityBorders:            editorData.config.debug.showsEntityBorders,
			/**
			 * Hitboxes of entities.
			 */
			showsEntityHitboxes:           editorData.config.debug.showsEntityHitboxes,
			/**
			 * Centers of entities, which means their location.
			 */
			showsEntityCenters:            editorData.config.debug.showsEntityCenters,
			/**
			 * Sorting curves, used for displaying entities in the right order from a visual perspective.
			 */
			showsViewSortingCurves:        editorData.config.debug.showsViewSortingCurves,
			/**
			 * Bigger version of hitboxes. They are used for creating visibility graphs, in the context of pathfinding.
			 */
			showsExtendedHitboxes:         editorData.config.debug.showsExtendedHitboxes,
			/**
			 * Nodes of visibility graphs, in the context of pathfinding.
			 */
			showsVisibilityGraphNodes:     editorData.config.debug.showsVisibilityGraphNodes,
			/**
			 * Available paths in a visibility graph, in the context of pathfinding.
			 */
			showsVisibilityGraphNodeLinks: editorData.config.debug.showsVisibilityGraphNodeLinks,
			/**
			 * The best path of a visibility graph, using a pathfinding algorithm.
			 */
			showsVisibilityGraphSolution:  editorData.config.debug.showsVisibilityGraphSolution,
			/**
			 * The coordinates of the mouse, displayed on top of the mouse.
			 */
			showsMouseCoordinates:         editorData.config.debug.showsMouseCoordinates,
		},
	};
}

export const configManager = new ConfigManager();