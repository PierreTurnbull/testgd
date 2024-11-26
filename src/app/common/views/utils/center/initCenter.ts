import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";

export const initCenter = (
	name: string,
	coordinates: TCoordinates,
) => {
	const center = new Graphics();

	center.poly([
		{ x: -1, y: -1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 1 },
		{ x: -1, y: 1 },
	]);

	center
		.stroke({
			width:     1,
			color:     0xffffff,
			alignment: 0.5,
		});

	const label = `${name}.center`;
	center.label = label;
	updateViewContainerCoordinates(center, coordinates);
	worldManager.world.addChild(center);

	return center;
};