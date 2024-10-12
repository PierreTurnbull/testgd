import { Box } from "detect-collisions";
import { TCoordinates } from "../../types/coordinates.types";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";

/**
 * Updates the hitbox position using the provided coordinates.
 * The hitbox position is the top-left corner of the hitbox, therefore the position is computed
 * with the next coordinates and half of the dimensions of the hitbox as negative offsets.
 */
export const updateHitboxPosition = (
	body: Box,
	nextCoordinates: TCoordinates,
) => {
	const nextHitboxCoordinates: TCoordinates = {
		x: nextCoordinates.x - body.width / 2,
		y: nextCoordinates.y - body.height / 2,
	};
	body.setPosition(nextHitboxCoordinates.x, nextHitboxCoordinates.y);
	collisionsManager.updateBody(body);
};