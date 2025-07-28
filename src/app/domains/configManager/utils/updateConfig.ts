import { data as editorData } from "@app/domains/editor/data/data";
import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { AMouseCoordinates } from "@root/app/common/archetypes/mouseCoordinates/mouseCoordinates.archetype";
import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CMouseCoordinates } from "@root/app/common/components/mouseCoordinates/mouseCoordinates.component";
import { appManager } from "../../app/appManager.singleton";
import { TConfig } from "../../editor/data/data.types";
import { CHitboxView } from "../../hitbox/components/hitboxView/hitboxView.component";
import { getHitboxBorderView } from "../../hitbox/utils/getHitboxBorderView/getHitboxBorderView";
import { getMouseCoordinatesView } from "../../mouseCoordinates/utils/views/getMouseCoordinatesView/getMouseCoordinatesView";
import { CVisibilityGraph } from "../../pathfinding/components/visibilityGraph/visibilityGraph.component";
import { getExtendedHitboxPointViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getExtendedHitboxPointViewGroup/getExtendedHitboxPointViewGroup";
import { getExtendedHitboxViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getExtendedHitboxViewGroup/getExtendedHitboxViewGroup";
import { getFromLinkedNodeViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getFromLinkedNodeViewGroup/getFromLinkedNodeViewGroup";
import { getLinkedNodeViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getLinkedNodeViewGroup/getLinkedNodeViewGroup";
import { getVisibilityGraphNodeViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getNodeViewGroup/getNodeViewGroup";
import { getSolutionView } from "../../pathfinding/utils/visibilityGraph/views/getSolutionViewGroup/getSolutionViewGroup";
import { getToAreaLinkedNodeViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getToAreaLinkedNodeViewGroup/getToAreaLinkedNodeViewGroup";
import { getToLinkedNodeViewGroup } from "../../pathfinding/utils/visibilityGraph/views/getToLinkedNodeViewGroup/getToLinkedNodeViewGroup";
import { getBorderView } from "../../view/utils/common/getBorderView/getBorderView";
import { getCenterView } from "../../view/utils/common/getCenterView/getCenterView";
import { createViewGroups } from "../../view/utils/create/createViewGroups/createViewGroups";
import { createViews } from "../../view/utils/create/createViews/createViews";
import { removeView } from "../../view/utils/remove/removeView/removeView";
import { removeViewGroups } from "../../view/utils/remove/removeViewGroups/removeViewGroups";
import { removeViews } from "../../view/utils/remove/removeViews/removeViews";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { getViewSortingCurveView } from "../../viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";
import { configManager } from "../configManager.singleton";

export const updateConfig = (nextConfig: Pick<TConfig, "debug">) => {
	const mouseCoordinatesEntity = [...archetypeManager.getArchetype(AMouseCoordinates).entities][0];

	const mustRemoveBorderViews = configManager.config.debug.showsEntityBorders && !nextConfig.debug.showsEntityBorders;
	const mustRemoveCenterViews = configManager.config.debug.showsEntityCenters && !nextConfig.debug.showsEntityCenters;
	const mustRemoveHitboxBorderViews = configManager.config.debug.showsEntityHitboxes && !nextConfig.debug.showsEntityHitboxes;
	const mustRemoveViewSortingCurveViews = configManager.config.debug.showsViewSortingCurves && !nextConfig.debug.showsViewSortingCurves;
	const mustRemoveExtendedHitboxViewGroups = configManager.config.debug.showsExtendedHitboxes && !nextConfig.debug.showsExtendedHitboxes;
	const mustRemoveVisibilityGraphNodeViewGroups = configManager.config.debug.showsVisibilityGraphNodes && !nextConfig.debug.showsVisibilityGraphNodes;
	const mustRemoveVisibilityGraphNodeLinkViewGroups = configManager.config.debug.showsVisibilityGraphNodeLinks && !nextConfig.debug.showsVisibilityGraphNodeLinks;
	const mustRemoveVisibilityGraphSolutionViewGroups = configManager.config.debug.showsVisibilityGraphSolution && !nextConfig.debug.showsVisibilityGraphSolution;
	const mustRemoveMouseCoordinatesView = configManager.config.debug.showsMouseCoordinates && !nextConfig.debug.showsMouseCoordinates;

	const mustCreateBorderViews = !configManager.config.debug.showsEntityBorders && nextConfig.debug.showsEntityBorders;
	const mustCreateCenterViews = !configManager.config.debug.showsEntityCenters && nextConfig.debug.showsEntityCenters;
	const mustCreateHitboxBorderViews = !configManager.config.debug.showsEntityHitboxes && nextConfig.debug.showsEntityHitboxes;
	const mustCreateViewSortingCurveViews = !configManager.config.debug.showsViewSortingCurves && nextConfig.debug.showsViewSortingCurves;
	const mustCreateExtendedHitboxViewGroups = !configManager.config.debug.showsExtendedHitboxes && nextConfig.debug.showsExtendedHitboxes;
	const mustCreateVisibilityGraphNodeViewGroups = !configManager.config.debug.showsVisibilityGraphNodes && nextConfig.debug.showsVisibilityGraphNodes;
	const mustCreateVisibilityGraphNodeLinkViewGroups = !configManager.config.debug.showsVisibilityGraphNodeLinks && nextConfig.debug.showsVisibilityGraphNodeLinks;
	const mustCreateVisibilityGraphSolutionViewGroups = !configManager.config.debug.showsVisibilityGraphSolution && nextConfig.debug.showsVisibilityGraphSolution;
	const mustCreateMouseCoordinatesView = !configManager.config.debug.showsMouseCoordinates && nextConfig.debug.showsMouseCoordinates;

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
	if (mustRemoveExtendedHitboxViewGroups) {
		removeViewGroups(CVisibilityGraph, "extendedHitboxViewGroup");
		removeViewGroups(CVisibilityGraph, "extendedHitboxPointViewGroup");
	}
	if (mustRemoveVisibilityGraphNodeViewGroups) {
		removeViewGroups(CVisibilityGraph, "nodeViewGroup");
	}
	if (mustRemoveVisibilityGraphNodeLinkViewGroups) {
		removeViewGroups(CVisibilityGraph, "linkedNodeViewGroup");
		removeViewGroups(CVisibilityGraph, "fromLinkedNodeViewGroup");
		removeViewGroups(CVisibilityGraph, "toLinkedNodeViewGroup");
		removeViewGroups(CVisibilityGraph, "toAreaLinkedNodeViewGroup");
	}
	if (mustRemoveVisibilityGraphSolutionViewGroups) {
		removeViewGroups(CVisibilityGraph, "solutionViewGroup");
	}
	if (mustRemoveMouseCoordinatesView) {
		removeView(mouseCoordinatesEntity, CMouseCoordinates, "text");
	}

	configManager.config = nextConfig;
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
		createViewGroups(CVisibilityGraph, getExtendedHitboxViewGroup, "extendedHitboxViewGroup");
		createViewGroups(CVisibilityGraph, getExtendedHitboxPointViewGroup, "extendedHitboxPointViewGroup");
	}
	if (mustCreateVisibilityGraphNodeViewGroups) {
		createViewGroups(CVisibilityGraph, getVisibilityGraphNodeViewGroup, "nodeViewGroup");
	}
	if (mustCreateVisibilityGraphNodeLinkViewGroups) {
		createViewGroups(CVisibilityGraph, getLinkedNodeViewGroup, "linkedNodeViewGroup");
		createViewGroups(CVisibilityGraph, getFromLinkedNodeViewGroup, "fromLinkedNodeViewGroup");
		createViewGroups(CVisibilityGraph, getToLinkedNodeViewGroup, "toLinkedNodeViewGroup");
		createViewGroups(CVisibilityGraph, getToAreaLinkedNodeViewGroup, "toAreaLinkedNodeViewGroup");
	}
	if (mustCreateVisibilityGraphSolutionViewGroups) {
		createViewGroups(CVisibilityGraph, getSolutionView, "solutionViewGroup");
	}
	if (mustCreateMouseCoordinatesView) {
		const mouseCoordinatesComponent = mouseCoordinatesEntity.getComponent(CMouseCoordinates);
		mouseCoordinatesComponent.text = getMouseCoordinatesView();
		appManager.app.stage.addChild(mouseCoordinatesComponent.text);
	}
};