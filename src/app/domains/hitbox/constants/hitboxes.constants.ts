import { flatEnvironmentConfigItems } from "@root/app/common/constants/editor.constants";
import { TPoint } from "@root/app/common/types/point.type";
import { TDimensions } from "../../../common/types/dimensions.types";

/**
 * Hitbox bounds used to determine the hitbox of the entity compared to their center.
 */
export const HITBOX_BOUNDS: Record<string, TDimensions> = {
	"characters.muddyBuddy.motion": { w: 40, h: 20 },
	"characters.muddyBuddy.damage": { w: 40, h: 20 },
	"characters.player.motion":     { w: 40, h: 20 },
	"projectiles.slash.damage":     { w: 0, h: 0 },
};

/**
 * Points for polygonal hitboxes.
 */
export const HITBOXES_POINTS: Record<string, TPoint[]> = {
	...Object.fromEntries(Object.entries(flatEnvironmentConfigItems).map(entry => {
		return [
			entry[0],
			entry[1].hitboxPoints,
		];
	})),
};