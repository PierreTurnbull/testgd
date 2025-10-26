import { CLocation } from "@root/app/ecs/components/common/location.component";
import { appManager } from "@root/app/features/app/appManager.singleton";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/features/app/constants/app.constants";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { playerArchetype } from "@root/app/features/player/archetypes/player.archetype";

/**
 * Returns the coordinates of the mouse in the game world.
 */
export const getMouseCoordinates = () => {
	const playerEntity = [...playerArchetype.entities][0];
	const playerLocationComponent = playerEntity.getComponent(CLocation);

	const x = appManager.app.renderer.events.pointer.x;
	const y = appManager.app.renderer.events.pointer.y;

	const offsetX = Math.round(x - CANVAS_WIDTH / 2 + playerLocationComponent.coordinates.x);
	const offsetY = Math.round(y - CANVAS_HEIGHT / 2 + playerLocationComponent.coordinates.y);

	const mouseCoordinates: TCoordinates = {
		x: offsetX,
		y: offsetY,
	};

	return mouseCoordinates;
};