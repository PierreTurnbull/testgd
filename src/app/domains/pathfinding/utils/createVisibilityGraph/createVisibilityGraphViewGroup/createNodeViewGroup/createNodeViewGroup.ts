import { TPoint } from "@root/app/common/types/point.type";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph/visibilityGraph.component";

const getExtendedHitboxPointViewGroup = (extendedHitboxPoint: TPoint) => {
	const extendedHitboxPointViewGroup = new Graphics();

	extendedHitboxPointViewGroup.circle(extendedHitboxPoint.x, extendedHitboxPoint.y, 3);

	extendedHitboxPointViewGroup
		.stroke({
			width:     1,
			color:     0xffffff,
			alignment: 0.5,
		});

	return extendedHitboxPointViewGroup;
};

export const createExtendedHitboxViewGroup = (
	visibilityGraphComponent: CVisibilityGraph,
) => {
	if (configManager.config.debug.showsVisibilityGraphNodes) {
		visibilityGraphComponent.extendedHitboxesPoints.forEach(extendedHitboxPoints => {
			extendedHitboxPoints.forEach(extendedHitboxPoint => {
				const extendedHitboxPointViewGroup = getExtendedHitboxPointViewGroup(extendedHitboxPoint);
				worldManager.world.addChild(extendedHitboxPointViewGroup);
				visibilityGraphComponent.extendedHitboxPointViewGroup.push(extendedHitboxPointViewGroup);
			});
		});
	}
};