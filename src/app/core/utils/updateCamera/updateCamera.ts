import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/features/app/constants/app.constants";
import { playerArchetype } from "@root/app/features/player/archetypes/player.archetype";
import { worldManager } from "@root/app/features/world/singletons/worldManager.singleton";

export const updateCamera = () => {
	const playerEntity = [...playerArchetype.entities][0];

	if (!playerEntity) {
		return;
	}

	const playerLocationComponent = playerEntity.getComponent(CLocation);

	worldManager.world.x = CANVAS_WIDTH / 2 - playerLocationComponent.coordinates.x;
	worldManager.world.y = CANVAS_HEIGHT / 2 - playerLocationComponent.coordinates.y;
};