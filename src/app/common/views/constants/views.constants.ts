import { HITBOX_BOUNDS } from "../../../domains/hitbox/constants/hitboxes.constants";
import { SCALE_FACTOR } from "../../types/animatedSprites.types";
import { TCoordinates } from "../../types/coordinates.types";

export const ANIMATION_SPEEDS: Record<string, number> = {
	"characters.muddyBuddy.rolling":   0.4,
	"characters.muddyBuddy.standing":  1,
	"characters.muddyBuddy.dying":     0.4,
	"characters.muddyBuddy.beingDead": 1,
	"characters.muddyBuddy.beingHit":  0.05,
	"characters.player.attacking":     0.8,
	"characters.player.running":       0.8,
	"characters.player.standing":      0.2,
	"characters.player.dying":         0.4,
	"characters.player.beingDead":     1,
	"characters.player.beingHit":      0.05,
};

const ANIMATED_SPRITES_CENTER_OFFSETS: Record<string, TCoordinates> = {
	"characters.muddyBuddy.rolling":   { x: -32,	y: -40 },
	"characters.muddyBuddy.standing":  { x: -32,	y: -40 },
	"characters.muddyBuddy.dying":     { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead": { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit":  { x: -32,	y: -40 },
	"characters.player.attacking":     { x: -32,	y: -32 },
	"characters.player.running":       { x: -32,	y: -32 },
	"characters.player.standing":      { x: -32,	y: -32 },
	"characters.player.dying":         { x: -32,	y: -32 },
	"characters.player.beingDead":     { x: -32,	y: -32 },
	"characters.player.beingHit":      { x: -32,	y: -32 },
};

const BORDERS_CENTER_OFFSETS = Object.fromEntries(
	Object.entries(ANIMATED_SPRITES_CENTER_OFFSETS)
		.map(entry => {
			const name = `${entry[0]}.border`;
			const borderOffsets = {
				x: entry[1].x,
				y: entry[1].y,
			};

			return [name, borderOffsets];
		}),
);

const HITBOXES_CENTER_OFFSETS: Record<string, TCoordinates> = Object.fromEntries(
	Object.entries(HITBOX_BOUNDS)
		.map(entry => {
			const name = `${entry[0]}.hitboxBorder`;
			const hitboxOffsets = {
				x: -entry[1].w / 2,
				y: -entry[1].h / 2,
			};

			return [name, hitboxOffsets];
		}),
);

/**
 * Scaled offsets corresponding to views that are scaled, such as a character's sprite.
 */
const SCALED_VIEWS_CENTER_OFFSETS: Record<string, TCoordinates> = Object.fromEntries(
	[
		...Object.entries(ANIMATED_SPRITES_CENTER_OFFSETS),
		...Object.entries(BORDERS_CENTER_OFFSETS),
	]
		.map(entry => {
			const scaledValues = {
				x: entry[1].x * SCALE_FACTOR,
				y: entry[1].y * SCALE_FACTOR,
			};

			return [entry[0], scaledValues];
		}),
);

/**
 * Offsets used to determine the center of the entity compared to its view.
 * The center of an entity corresponds to coordinates in the game world, and has nothing to
 * do with the center of a view. It corresponds for example to the feet of a character, which might
 * not be represented at the center of the sprite. These offsets are used to make it seem as the entity
 * is centered on the coordinates.
 */
export const ENTITIES_CENTER_OFFSETS: Record<string, TCoordinates> = Object.assign(
	{},
	HITBOXES_CENTER_OFFSETS,
	SCALED_VIEWS_CENTER_OFFSETS,
);