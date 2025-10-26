import { Ticker } from "pixi.js";
import { fpsArchetype } from "../../archetypes/fps.archetype";
import { CFps } from "../../components/fps/fps.component";
import { FPS_REFRESH_DELAY } from "../../constants/fps.constants";

export const updateFps = (delta: Ticker) => {
	const fpsEntity = [...fpsArchetype.entities][0];
	const fpsComponent = fpsEntity.getComponent(CFps);

	if (new Date().getTime() - fpsComponent.timeSinceLastUpdate < FPS_REFRESH_DELAY) return;

	fpsComponent.fps = Math.round(delta.FPS);
	fpsComponent.text.text = `${fpsEntity.getComponent(CFps).fps} fps`;
	fpsComponent.timeSinceLastUpdate = new Date().getTime();
};