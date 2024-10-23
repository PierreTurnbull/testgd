import { appManager } from "@root/app/domains/app/appManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";
import { Graphics } from "pixi.js";

export const initCenter = (
	name: string,
	coordinates: TCoordinates,
) => {
	const center = new Graphics();

	center.poly([
		{
			x: -1,
			y: -1,
		},
		{
			x: 1,
			y: -1,
		},
		{
			x: 1,
			y: 1,
		},
		{
			x: -1,
			y: 1,
		},
	]);

	center
		.stroke({
			width:     1,
			color:     0xfe7777,
			alignment: 1,
		});

	const label = `${name}.center`;
	center.label = label;
	updateViewContainerCoordinates(center, coordinates);
	appManager.app.stage.addChild(center);

	return center;
};