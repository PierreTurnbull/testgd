import { Text } from "pixi.js";

export const getMouseCoordinatesView = () => {
	const mouseCoordinatesView = new Text({
		text:  "",
		style: {
			fontFamily: "Pixeled",
			fontSize:   10,
			fill:       0xFFFFFF,
		},
	});
	
	return mouseCoordinatesView;
};