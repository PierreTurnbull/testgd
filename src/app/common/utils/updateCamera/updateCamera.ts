import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/core/constants/app.constants";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { playerArchetype } from "../../archetypes/player/player.archetype";
import { CLocation } from "../../components/location/location.component";

export const updateCamera = () => {
	const playerEntity = [...playerArchetype.entities][0];

	if (!playerEntity) {
		return;
	}

	const playerLocationComponent = playerEntity.getComponent(CLocation);

	worldManager.world.x = CANVAS_WIDTH / 2 - playerLocationComponent.coordinates.x;
	worldManager.world.y = CANVAS_HEIGHT / 2 - playerLocationComponent.coordinates.y;
};