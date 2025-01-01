import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CLocation } from "@root/app/common/components/location/location.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@root/app/core/constants/app.constants";
import { appManager } from "@root/app/domains/app/appManager.singleton";

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