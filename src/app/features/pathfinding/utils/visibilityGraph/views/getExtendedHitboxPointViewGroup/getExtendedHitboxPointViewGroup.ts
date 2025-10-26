
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TPoint } from "@root/app/features/math/types/point.type";
import { CVisibilityGraph } from "@root/app/features/pathfinding/components/visibilityGraph.component";
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