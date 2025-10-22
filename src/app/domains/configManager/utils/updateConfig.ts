import { data as editorData } from "@app/domains/editor/data/data";
import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { AMouseCoordinates } from "@root/app/common/archetypes/mouseCoordinates/mouseCoordinates.archetype";
import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CMouseCoordinates } from "@root/app/common/components/mouseCoordinates/mouseCoordinates.component";
import { appManager } from "../../app/appManager.singleton";
import { TConfig } from "../../editor/data/data.types";
import { entityManager } from "../../entity/entityManager.singleton";
import { CHitboxView } from "../../hitbox/components/hitboxView/hitboxView.component";
import { getHitboxBorderView } from "../../hitbox/utils/getHitboxBorderView/getHitboxBorderView";
import { CVisibilityGraph } from "../../pathfinding/components/visibilityGraph/visibilityGraph.component";
import { getLinkedNodeView } from "../../pathfinding/utils/createVisibilityGraph/createVisibilityGraphViewGroup/createNodeLinkViewGroup/createNodeLinkViewGroup";
import { getBorderView } from "../../view/border/utils/getBorderView/getBorderView";
import { getCenterView } from "../../view/center/utils/getCenterView/getCenterView";
import { getExtendedHitboxPointViewGroup } from "../../view/extendedHitbox/utils/getExtendedHitboxPointViewGroup/getExtendedHitboxPointViewGroup";
import { getExtendedHitboxViewGroup } from "../../view/extendedHitbox/utils/getExtendedHitboxViewGroup/getExtendedHitboxViewGroup";
import { getFromLinkedNodeViewGroup } from "../../view/linkedNode/utils/getFromNodeViewGroup/getFromNodeViewGroup";
import { getToAreaLinkedNodeViewGroup } from "../../view/linkedNode/utils/getToAreaNodeViewGroup/getToAreaNodeViewGroup";
import { getToLinkedNodeViewGroup } from "../../view/linkedNode/utils/getToNodeViewGroup/getToNodeViewGroup";
import { getMouseCoordinatesView } from "../../view/mouseCoordinates/utils/getMouseCoordinatesView/getMouseCoordinatesView";
import { createView } from "../../view/utils/createView/createView";
import { createViewGroups } from "../../view/utils/createViewGroups/createViewGroups";
import { createViews } from "../../view/utils/createViews/createViews";
import { removeView } from "../../view/utils/removeView/removeView";
import { removeViewGroups } from "../../view/utils/removeViewGroups/removeViewGroups";
import { removeViews } from "../../view/utils/removeViews/removeViews";
import { getVisibilityGraphNodeViewGroup } from "../../view/visibilityGraphNode/utils/getVisibilityGraphNodeViewGroup/getVisibilityGraphNodeViewGroup";
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
		removeViewGroups(CVisibilityGraph, "fromLinkedNodeViewGroup");
		removeViewGroups(CVisibilityGraph, "toLinkedNodeViewGroup");
		removeViewGroups(CVisibilityGraph, "toAreaLinkedNodeViewGroup");
	}
	// if (mustRemoveVisibilityGraphSolutionViewGroups) {
	// 	removeVisibilityGraphSolutionViewGroups();
	// }
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
		createViewGroups(CVisibilityGraph, getFromLinkedNodeViewGroup, "fromLinkedNodeViewGroup");
		createViewGroups(CVisibilityGraph, getToLinkedNodeViewGroup, "toLinkedNodeViewGroup");
		createViewGroups(CVisibilityGraph, getToAreaLinkedNodeViewGroup, "toAreaLinkedNodeViewGroup");
	}
	// if (mustCreateVisibilityGraphSolutionViewGroups) {
	// 	removeVisibilityGraphSolutionViewGroups();
	// }
	if (mustCreateMouseCoordinatesView) {
		const mouseCoordinatesComponent = mouseCoordinatesEntity.getComponent(CMouseCoordinates);
		mouseCoordinatesComponent.text = getMouseCoordinatesView();
		appManager.app.stage.addChild(mouseCoordinatesComponent.text);
	}
};