import { APlayer } from "../../archetypes/player/player.archetype";
import { entityManager } from "../../entities/entityManager.singleton";
import { CLocation } from "../../components/location/location.component";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/core/constants/app.constants";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";

export const updateCamera = () => {
	const playerEntity = entityManager.entities.find(entity => entity.matchesArchetype(APlayer));

	if (!playerEntity) {
		return;
	}

	const playerLocationComponent = playerEntity.getComponent(CLocation);

	worldManager.world.x = CANVAS_WIDTH / 2 - playerLocationComponent.coordinates.x;
	worldManager.world.y = CANVAS_HEIGHT / 2 - playerLocationComponent.coordinates.y;
};