import { appManager } from "@root/app/common/app/appManager.singleton";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { updateViewContainerCoordinates } from "@root/app/common/utils/updateViewContainerCoordinates/updateViewContainerCoordinates";
import { Graphics } from "pixi.js";

export const setCenterView = (
	viewComponent: CCenterView,
	hitboxName: string,
	coordinates: TCoordinates,
) => {
	const centerView = new Graphics();

	centerView.poly([
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

	centerView
		.stroke({
			width:     1,
			color:     0xfe7777,
			alignment: 1,
		});

	const label = `${hitboxName}.centerView`;
	centerView.label = label;
	updateViewContainerCoordinates(centerView, coordinates);
	appManager.app.stage.addChild(centerView);
	viewComponent.centerView = centerView;
};