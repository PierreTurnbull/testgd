import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { Graphics } from "pixi.js";

export const initCenterView = (
	name: string,
	coordinates: TCoordinates,
) => {
	const centerView = new Graphics();

	centerView.poly([
		{ x: -1, y: -1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 1 },
		{ x: -1, y: 1 },
	]);

	centerView
		.stroke({
			width:     1,
			color:     0xffffff,
			alignment: 0.5,
		});

	const label = `${name}.center`;
	centerView.label = label;
	updateViewContainerCoordinates(centerView, coordinates);
	worldManager.world.addChild(centerView);

	return centerView;
};