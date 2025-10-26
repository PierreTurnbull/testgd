import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { appManager } from "@root/app/features/app/appManager.singleton";
import { CFps } from "@root/app/features/fps/components/fps/fps.component";
import { Text } from "pixi.js";

export const initFps = () => {
	const fpsComponent = new CFps();

	fpsComponent.text = new Text({
		text:  "",
		style: {
			fontFamily: "Pixeled",
			fontSize:   10,
			fill:       0xFFFFFF,
		},
	});
	fpsComponent.text.x = 10;
	fpsComponent.text.y = 10;
	appManager.app.stage.addChild(fpsComponent.text);

	entityManager.createEntity(
		"fps",
		[
			fpsComponent,
		],
	);
};