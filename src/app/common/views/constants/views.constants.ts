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

const SPRITES_CENTER_OFFSETS: Record<string, TCoordinates> = {
	"characters.muddyBuddy.rolling.up":        { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.upRight":   { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.right":     { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.downRight": { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.down":      { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.downLeft":  { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.left":      { x: -32,	y: -40 },
	"characters.muddyBuddy.rolling.upLeft":    { x: -32,	y: -40 },

	"characters.muddyBuddy.standing.up":        { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.upRight":   { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.right":     { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.downRight": { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.down":      { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.downLeft":  { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.left":      { x: -32,	y: -40 },
	"characters.muddyBuddy.standing.upLeft":    { x: -32,	y: -40 },

	"characters.muddyBuddy.dying.up":        { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.upRight":   { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.right":     { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.downRight": { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.down":      { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.downLeft":  { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.left":      { x: -32,	y: -40 },
	"characters.muddyBuddy.dying.upLeft":    { x: -32,	y: -40 },

	"characters.muddyBuddy.beingDead.up":        { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.upRight":   { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.right":     { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.downRight": { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.down":      { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.downLeft":  { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.left":      { x: -32,	y: -40 },
	"characters.muddyBuddy.beingDead.upLeft":    { x: -32,	y: -40 },

	"characters.muddyBuddy.beingHit.up":        { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.upRight":   { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.right":     { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.downRight": { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.down":      { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.downLeft":  { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.left":      { x: -32,	y: -40 },
	"characters.muddyBuddy.beingHit.upLeft":    { x: -32,	y: -40 },

	"characters.player.attacking.up":        { x: -32,	y: -32 },
	"characters.player.attacking.upRight":   { x: -32,	y: -32 },
	"characters.player.attacking.right":     { x: -32,	y: -32 },
	"characters.player.attacking.downRight": { x: -32,	y: -32 },
	"characters.player.attacking.down":      { x: -32,	y: -32 },
	"characters.player.attacking.downLeft":  { x: -32,	y: -32 },
	"characters.player.attacking.left":      { x: -32,	y: -32 },
	"characters.player.attacking.upLeft":    { x: -32,	y: -32 },

	"characters.player.running.up":        { x: -32,	y: -32 },
	"characters.player.running.upRight":   { x: -32,	y: -32 },
	"characters.player.running.right":     { x: -32,	y: -32 },
	"characters.player.running.downRight": { x: -32,	y: -32 },
	"characters.player.running.down":      { x: -32,	y: -32 },
	"characters.player.running.downLeft":  { x: -32,	y: -32 },
	"characters.player.running.left":      { x: -32,	y: -32 },
	"characters.player.running.upLeft":    { x: -32,	y: -32 },

	"characters.player.standing.up":        { x: -32,	y: -32 },
	"characters.player.standing.upRight":   { x: -32,	y: -32 },
	"characters.player.standing.right":     { x: -32,	y: -32 },
	"characters.player.standing.downRight": { x: -32,	y: -32 },
	"characters.player.standing.down":      { x: -32,	y: -32 },
	"characters.player.standing.downLeft":  { x: -32,	y: -32 },
	"characters.player.standing.left":      { x: -32,	y: -32 },
	"characters.player.standing.upLeft":    { x: -32,	y: -32 },

	"characters.player.dying.up":        { x: -32,	y: -32 },
	"characters.player.dying.upRight":   { x: -32,	y: -32 },
	"characters.player.dying.right":     { x: -32,	y: -32 },
	"characters.player.dying.downRight": { x: -32,	y: -32 },
	"characters.player.dying.down":      { x: -32,	y: -32 },
	"characters.player.dying.downLeft":  { x: -32,	y: -32 },
	"characters.player.dying.left":      { x: -32,	y: -32 },
	"characters.player.dying.upLeft":    { x: -32,	y: -32 },

	"characters.player.beingDead.up":        { x: -32,	y: -32 },
	"characters.player.beingDead.upRight":   { x: -32,	y: -32 },
	"characters.player.beingDead.right":     { x: -32,	y: -32 },
	"characters.player.beingDead.downRight": { x: -32,	y: -32 },
	"characters.player.beingDead.down":      { x: -32,	y: -32 },
	"characters.player.beingDead.downLeft":  { x: -32,	y: -32 },
	"characters.player.beingDead.left":      { x: -32,	y: -32 },
	"characters.player.beingDead.upLeft":    { x: -32,	y: -32 },

	"characters.player.beingHit.up":        { x: -32,	y: -32 },
	"characters.player.beingHit.upRight":   { x: -32,	y: -32 },
	"characters.player.beingHit.right":     { x: -32,	y: -32 },
	"characters.player.beingHit.downRight": { x: -32,	y: -32 },
	"characters.player.beingHit.down":      { x: -32,	y: -32 },
	"characters.player.beingHit.downLeft":  { x: -32,	y: -32 },
	"characters.player.beingHit.left":      { x: -32,	y: -32 },
	"characters.player.beingHit.upLeft":    { x: -32,	y: -32 },

	"environment.rockMD.0": { x: -32,	y: -44 },
	"environment.rockMD.1": { x: -32,	y: -50 },
	"environment.rockMD.2": { x: -32,	y: -44 },
	"environment.rockMD.3": { x: -32,	y: -50 },

	"environment.rockLG.0.up":        { x: -64,	y: -75 },
	"environment.rockLG.0.upRight":   { x: -64,	y: -72 },
	"environment.rockLG.0.right":     { x: -64,	y: -72 },
	"environment.rockLG.0.downRight": { x: -64,	y: -72 },
	"environment.rockLG.0.down":      { x: -64,	y: -72 },
	"environment.rockLG.0.downLeft":  { x: -64,	y: -72 },
	"environment.rockLG.0.left":      { x: -64,	y: -72 },
	"environment.rockLG.0.upLeft":    { x: -64,	y: -72 },

	"environment.rockLG.1.up":        { x: -64,	y: -75 },
	"environment.rockLG.1.upRight":   { x: -64,	y: -75 },
	"environment.rockLG.1.right":     { x: -64,	y: -75 },
	"environment.rockLG.1.downRight": { x: -64,	y: -75 },
	"environment.rockLG.1.down":      { x: -64,	y: -75 },
	"environment.rockLG.1.downLeft":  { x: -64,	y: -75 },
	"environment.rockLG.1.left":      { x: -64,	y: -75 },
	"environment.rockLG.1.upLeft":    { x: -64,	y: -75 },

	"environment.rockLG.2.up":        { x: -64,	y: -73 },
	"environment.rockLG.2.upRight":   { x: -64,	y: -73 },
	"environment.rockLG.2.right":     { x: -64,	y: -73 },
	"environment.rockLG.2.downRight": { x: -64,	y: -73 },
	"environment.rockLG.2.down":      { x: -64,	y: -73 },
	"environment.rockLG.2.downLeft":  { x: -64,	y: -73 },
	"environment.rockLG.2.left":      { x: -64,	y: -73 },
	"environment.rockLG.2.upLeft":    { x: -64,	y: -73 },

	"environment.rockLG.3.up":        { x: -64,	y: -80 },
	"environment.rockLG.3.upRight":   { x: -64,	y: -80 },
	"environment.rockLG.3.right":     { x: -64,	y: -80 },
	"environment.rockLG.3.downRight": { x: -64,	y: -80 },
	"environment.rockLG.3.down":      { x: -64,	y: -80 },
	"environment.rockLG.3.downLeft":  { x: -64,	y: -80 },
	"environment.rockLG.3.left":      { x: -64,	y: -80 },
	"environment.rockLG.3.upLeft":    { x: -64,	y: -80 },

	"environment.dirt.0": { x: -128,	y: -128 },
	"environment.dirt.1": { x: -128,	y: -128 },
	"environment.dirt.2": { x: -128,	y: -128 },
	"environment.dirt.3": { x: -128,	y: -128 },
	"environment.dirt.4": { x: -128,	y: -128 },
	"environment.dirt.5": { x: -128,	y: -128 },
	"environment.dirt.6": { x: -128,	y: -128 },
	"environment.dirt.7": { x: -128,	y: -128 },
	"environment.dirt.8": { x: -128,	y: -128 },
	"environment.dirt.9": { x: -128,	y: -128 },
};

const BORDERS_CENTER_OFFSETS = Object.fromEntries(
	Object.entries(SPRITES_CENTER_OFFSETS)
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
		...Object.entries(SPRITES_CENTER_OFFSETS),
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