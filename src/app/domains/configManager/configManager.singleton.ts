import { data as editorData } from "@app/domains/editor/data/data";
import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { getBorderView } from "@root/app/domains/view/border/utils/getBorderView/getBorderView";
import { getCenterView } from "@root/app/domains/view/center/utils/getCenterView/getCenterView";
import { createViews } from "@root/app/domains/view/utils/createViews/createViews";
import { removeViews } from "@root/app/domains/view/utils/removeViews/removeViews";
import { TConfig } from "../editor/data/data.types";
import { CHitboxView } from "../hitbox/components/hitboxView/hitboxView.component";
import { getHitboxBorderView } from "../hitbox/utils/getHitboxBorderView/getHitboxBorderView";
import { CVisibilityGraph } from "../pathfinding/components/visibilityGraph/visibilityGraph.component";
import { getExtendedHitboxPointViewGroup } from "../view/extendedHitbox/utils/getExtendedHitboxPointViewGroup/getExtendedHitboxPointViewGroup";
import { createViewGroups } from "../view/utils/createViewGroups/createViewGroups";
import { CViewSortingCurveView } from "../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { getViewSortingCurveView } from "../viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";

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

	update(nextConfig: Pick<TConfig, "debug">) {
		const mustRemoveBorderViews = this.config.debug.showsEntityBorders && !nextConfig.debug.showsEntityBorders;
		const mustRemoveCenterViews = this.config.debug.showsEntityCenters && !nextConfig.debug.showsEntityCenters;
		const mustRemoveHitboxBorderViews = this.config.debug.showsEntityHitboxes && !nextConfig.debug.showsEntityHitboxes;
		const mustRemoveViewSortingCurveViews = this.config.debug.showsViewSortingCurves && !nextConfig.debug.showsViewSortingCurves;
		const mustRemoveExtendedHitboxViewGroups = this.config.debug.showsExtendedHitboxes && !nextConfig.debug.showsExtendedHitboxes;
		const mustRemoveVisibilityGraphNodeViewGroups = this.config.debug.showsVisibilityGraphNodes && !nextConfig.debug.showsVisibilityGraphNodes;
		const mustRemoveVisibilityGraphNodeLinkViewGroups = this.config.debug.showsVisibilityGraphNodeLinks && !nextConfig.debug.showsVisibilityGraphNodeLinks;
		const mustRemoveVisibilityGraphSolutionViewGroups = this.config.debug.showsVisibilityGraphSolution && !nextConfig.debug.showsVisibilityGraphSolution;
		const mustRemoveMouseCoordinatesView = this.config.debug.showsMouseCoordinates && !nextConfig.debug.showsMouseCoordinates;

		const mustCreateBorderViews = !this.config.debug.showsEntityBorders && nextConfig.debug.showsEntityBorders;
		const mustCreateCenterViews = !this.config.debug.showsEntityCenters && nextConfig.debug.showsEntityCenters;
		const mustCreateHitboxBorderViews = !this.config.debug.showsEntityHitboxes && nextConfig.debug.showsEntityHitboxes;
		const mustCreateViewSortingCurveViews = !this.config.debug.showsViewSortingCurves && nextConfig.debug.showsViewSortingCurves;
		const mustCreateExtendedHitboxViewGroups = !this.config.debug.showsExtendedHitboxes && nextConfig.debug.showsExtendedHitboxes;
		const mustCreateVisibilityGraphNodeViewGroups = !this.config.debug.showsVisibilityGraphNodes && nextConfig.debug.showsVisibilityGraphNodes;
		const mustCreateVisibilityGraphNodeLinkViewGroups = !this.config.debug.showsVisibilityGraphNodeLinks && nextConfig.debug.showsVisibilityGraphNodeLinks;
		const mustCreateVisibilityGraphSolutionViewGroups = !this.config.debug.showsVisibilityGraphSolution && nextConfig.debug.showsVisibilityGraphSolution;
		const mustCreateMouseCoordinatesView = !this.config.debug.showsMouseCoordinates && nextConfig.debug.showsMouseCoordinates;

		if (mustRemoveBorderViews) {
			removeViews(CBorderView, "borderView");
		}
		if (mustRemoveCenterViews) {
			removeViews(CCenterView, "centerView");
		}
		if (mustRemoveHitboxBorderViews) {
			removeViews(CHitboxView, "hitboxBorderView");
		}
		if (mustRemoveViewSortingCurveViews) {
			removeViews(CViewSortingCurveView, "viewSortingCurveView");
		}
		// if (mustRemoveExtendedHitboxViewGroups) {
		// 	removeExtendedHitboxViewGroups();
		// }
		// if (mustRemoveVisibilityGraphNodeViewGroups) {
		// 	removeVisibilityGraphNodeViewGroups();
		// }
		// if (mustRemoveVisibilityGraphNodeLinkViewGroups) {
		// 	removeVisibilityGraphNodeLinkViewGroups();
		// }
		// if (mustRemoveVisibilityGraphSolutionViewGroups) {
		// 	removeVisibilityGraphSolutionViewGroups();
		// }
		// if (mustRemoveMouseCoordinatesView) {
		// 	removeMouseCoordinatesView();
		// }

		this.config = nextConfig;
		editorData.config.debug = nextConfig.debug;

		if (mustCreateBorderViews) {
			createViews(CBorderView, getBorderView, "borderView");
		}
		if (mustCreateCenterViews) {
			createViews(CCenterView, getCenterView, "centerView");
		}
		if (mustCreateHitboxBorderViews) {
			createViews(CHitboxView, getHitboxBorderView, "hitboxBorderView");
		}
		if (mustCreateViewSortingCurveViews) {
			createViews(CViewSortingCurveView, getViewSortingCurveView, "viewSortingCurveView");
		}
		if (mustCreateExtendedHitboxViewGroups) {
			createViewGroups(CVisibilityGraph, getExtendedHitboxPointViewGroup, "extendedHitboxPointViewGroup");
		}
		// if (mustCreateVisibilityGraphNodeViewGroups) {
		// 	removeVisibilityGraphNodeViewGroups();
		// }
		// if (mustCreateVisibilityGraphNodeLinkViewGroups) {
		// 	removeVisibilityGraphNodeLinkViewGroups();
		// }
		// if (mustCreateVisibilityGraphSolutionViewGroups) {
		// 	removeVisibilityGraphSolutionViewGroups();
		// }
		// if (mustCreateMouseCoordinatesView) {
		// 	removeMouseCoordinatesView();
		// }
	}
}

export const configManager = new ConfigManager();