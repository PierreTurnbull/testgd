import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { TPoint } from "@root/app/common/types/point.type";
import { Graphics } from "pixi.js";

const getExtendedHitboxPointView = (extendedHitboxPoint: TPoint) => {
	const extendedHitboxPointView = new Graphics();

	extendedHitboxPointView.circle(extendedHitboxPoint.x, extendedHitboxPoint.y, 3);

	extendedHitboxPointView
		.stroke({
			width:     1,
			color:     0xffffff,
			alignment: 0.5,
		});

	return extendedHitboxPointView;
};

export const createNodeViews = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	if (configManager.config.debug.showsVisibilityGraphNodes) {
		visibilityGraphComponent.extendedHitboxesPoints.forEach(extendedHitboxPoints => {
			extendedHitboxPoints.forEach(extendedHitboxPoint => {
				const extendedHitboxPointView = getExtendedHitboxPointView(extendedHitboxPoint);
				worldManager.world.addChild(extendedHitboxPointView);
				visibilityGraphComponent.extendedHitboxPointViews.push(extendedHitboxPointView);
			});
		});
	}
};