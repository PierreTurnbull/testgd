import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";
import { Entity } from "@root/app/domains/entity/entity.models";
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
	updateViewContainerCoordinates(centerView, coordinates);
	
	return centerView;
};