import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/common/constants/app.constants";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";

export const updateCamera = () => {
	const playerEntity = [...playerArchetype.entities][0];

	if (!playerEntity) {
		return;
	}

	const playerLocationComponent = playerEntity.getComponent(CLocation);

	worldManager.world.x = CANVAS_WIDTH / 2 - playerLocationComponent.coordinates.x;
	worldManager.world.y = CANVAS_HEIGHT / 2 - playerLocationComponent.coordinates.y;
};