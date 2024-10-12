/* eslint-disable object-curly-newline,object-property-newline */

import { TDimensions } from "../../types/dimensions.types";

/**
 * Hitbox bounds used to determine the hitbox of the entity compared to their center.
 */
export const HITBOX_BOUNDS: Record<string, TDimensions> = {
	"characters.muddyBuddy":	{ w: 50,	h: 25 },
	"characters.player":		{ w: 40,	h: 20 },
};