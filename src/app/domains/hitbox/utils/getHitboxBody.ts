import { TPoint } from "@root/app/common/types/point.type";
import { collisionsManager } from "@root/app/domains/collisionsManager/collisionsManager.singletons";
import { Polygon } from "detect-collisions";
import { THitboxSettings } from "../types/hitbox.types";

/**
 * Returns the detect-collisions body of a hitbox.
 */
export const getHitboxBody = (
	settings: THitboxSettings,
	hitboxPoints: TPoint[],
) => {
	let hitboxBody: Polygon | null = null;

	const offsetCoordinates: TPoint = {
		x: settings.initialCoordinates.x + settings.offset.x,
		y: settings.initialCoordinates.y + settings.offset.y,
	};

	hitboxBody = collisionsManager.system.createPolygon(
		offsetCoordinates,
		hitboxPoints,
		{
			isTrigger: settings.type === "damage",
		},
	);

	return hitboxBody;
};