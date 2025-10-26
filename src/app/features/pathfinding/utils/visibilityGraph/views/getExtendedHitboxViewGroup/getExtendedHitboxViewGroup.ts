import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TPoint } from "@root/app/features/math/types/point.type";
import { Graphics } from "pixi.js";
import { CVisibilityGraph } from "../../../../components/visibilityGraph.component";

const getExtendedHitboxView = (extendedHitboxPoints: TPoint[]) => {
	const extendedHitboxView = new Graphics();
	
	extendedHitboxView.poly(extendedHitboxPoints);

	extendedHitboxView
		.stroke({
			width:     1,
			color:     0xffaa00,
			alignment: 0.5,
		});

	return extendedHitboxView;
};

export const getExtendedHitboxViewGroup = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	const extendedHitboxViewGroup = visibilityGraphComponent.extendedHitboxesPoints.map(extendedHitboxPoints => {
		const extendedHitboxView = getExtendedHitboxView(extendedHitboxPoints);

		return extendedHitboxView;
	});

	return extendedHitboxViewGroup;
};