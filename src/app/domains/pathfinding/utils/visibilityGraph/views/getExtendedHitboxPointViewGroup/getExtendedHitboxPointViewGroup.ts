import { TPoint } from "@root/app/common/types/point.type";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { Graphics } from "pixi.js";

const getExtendedHitboxPointView = (extendedHitboxPoint: TPoint) => {
	const extendedHitboxPointView = new Graphics();

	extendedHitboxPointView.circle(extendedHitboxPoint.x, extendedHitboxPoint.y, 3);

	extendedHitboxPointView
		.stroke({
			width:     1,
			color:     0xffaa00,
			alignment: 0.5,
		});

	return extendedHitboxPointView;
};

export const getExtendedHitboxPointViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const extendedHitboxPointViewGroup = visibilityGraphComponent.extendedHitboxesPoints.map(extendedHitboxPoints => {
		return extendedHitboxPoints.map(extendedHitboxPoint => {
			const extendedHitboxPointViewGroup = getExtendedHitboxPointView(extendedHitboxPoint);

			return extendedHitboxPointViewGroup;
		});
	}).flat();

	return extendedHitboxPointViewGroup;
};