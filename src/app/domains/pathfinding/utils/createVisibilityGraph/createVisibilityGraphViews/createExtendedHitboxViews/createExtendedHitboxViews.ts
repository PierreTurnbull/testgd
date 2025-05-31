import { TPoint } from "@root/app/common/types/point.type";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";

const getExtendedHitboxView = (extendedHitboxPoints: TPoint[]) => {
	const extendedHitboxView = new Graphics();
	
	extendedHitboxView.poly(extendedHitboxPoints);

	extendedHitboxView
		.stroke({
			width:     1,
			color:     0xffff00,
			alignment: 0.5,
		});

	return extendedHitboxView;
};

export const createExtendedHitboxViews = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	if (configManager.config.debug.showsExtendedHitboxes) {
		visibilityGraphComponent.extendedHitboxesPoints.forEach(extendedHitboxPoints => {
			const extendedHitboxView = getExtendedHitboxView(extendedHitboxPoints);
			worldManager.world.addChild(extendedHitboxView);
			visibilityGraphComponent.extendedHitboxViews.push(extendedHitboxView);
		});
	}
};