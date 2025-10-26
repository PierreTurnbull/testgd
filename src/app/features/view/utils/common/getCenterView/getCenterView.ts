import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { CView } from "@root/app/features/view/components/view.component";
import { Graphics } from "pixi.js";

export const getCenterView = (
	entity: Entity,
) => {
	const view = entity.getComponent(CView).view;
	const coordinates = entity.getComponent(CLocation).coordinates;

	const centerView = new Graphics();

	centerView.poly([
		{ x: -2, y: -2 },
		{ x: 2, y: -2 },
		{ x: 2, y: 2 },
		{ x: -2, y: 2 },
	]);

	centerView
		.stroke({
			width:     2,
			color:     0xffffff,
			alignment: 0.5,
		});

	const label = `${view.label.split(".").slice(0, 2).join(".")}.center`;
	centerView.label = label;
	centerView.x = coordinates.x;
	centerView.y = coordinates.y;
	
	return centerView;
};