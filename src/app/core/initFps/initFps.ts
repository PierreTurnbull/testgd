import { appManager } from "@root/app/common/app/appManager.singleton";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { CFps } from "@root/app/domains/fps/components/fps/fps.component";
import { Text } from "pixi.js";

export const initFps = () => {
	const fpsComponent = new CFps();

	fpsComponent.text = new Text({
		text: "",
		style: {
			fontFamily: "Pixeled",
			fontSize: 10,
			fill: 0xFFFFFF,
		},
	});
	fpsComponent.text.x = 10;
	fpsComponent.text.y = 10;
	appManager.app.stage.addChild(fpsComponent.text);

	createEntity(
		"fps",
		[
			fpsComponent,
		],
	);
};