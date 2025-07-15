import { HITBOX_BOUNDS } from "../../domains/hitbox/constants/hitboxes.constants";
import { TCoordinates } from "../types/coordinates.types";
import { flatEnvironmentConfigItems } from "./editor.constants";

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
	"characters.muddyBuddy.rolling.up":        { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.upRight":   { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.right":     { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.downRight": { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.down":      { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.downLeft":  { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.left":      { x: -96,	y: -120 },
	"characters.muddyBuddy.rolling.upLeft":    { x: -96,	y: -120 },

	"characters.muddyBuddy.standing.up":        { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.upRight":   { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.right":     { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.downRight": { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.down":      { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.downLeft":  { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.left":      { x: -96,	y: -120 },
	"characters.muddyBuddy.standing.upLeft":    { x: -96,	y: -120 },

	"characters.muddyBuddy.dying.up":        { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.upRight":   { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.right":     { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.downRight": { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.down":      { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.downLeft":  { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.left":      { x: -96,	y: -120 },
	"characters.muddyBuddy.dying.upLeft":    { x: -96,	y: -120 },

	"characters.muddyBuddy.beingDead.up":        { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.upRight":   { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.right":     { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.downRight": { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.down":      { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.downLeft":  { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.left":      { x: -96,	y: -120 },
	"characters.muddyBuddy.beingDead.upLeft":    { x: -96,	y: -120 },

	"characters.muddyBuddy.beingHit.up":        { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.upRight":   { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.right":     { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.downRight": { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.down":      { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.downLeft":  { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.left":      { x: -96,	y: -120 },
	"characters.muddyBuddy.beingHit.upLeft":    { x: -96,	y: -120 },

	"characters.player.attacking.up":        { x: -96,	y: -96 },
	"characters.player.attacking.upRight":   { x: -96,	y: -96 },
	"characters.player.attacking.right":     { x: -96,	y: -96 },
	"characters.player.attacking.downRight": { x: -96,	y: -96 },
	"characters.player.attacking.down":      { x: -96,	y: -96 },
	"characters.player.attacking.downLeft":  { x: -96,	y: -96 },
	"characters.player.attacking.left":      { x: -96,	y: -96 },
	"characters.player.attacking.upLeft":    { x: -96,	y: -96 },

	"characters.player.running.up":        { x: -96,	y: -96 },
	"characters.player.running.upRight":   { x: -96,	y: -96 },
	"characters.player.running.right":     { x: -96,	y: -96 },
	"characters.player.running.downRight": { x: -96,	y: -96 },
	"characters.player.running.down":      { x: -96,	y: -96 },
	"characters.player.running.downLeft":  { x: -96,	y: -96 },
	"characters.player.running.left":      { x: -96,	y: -96 },
	"characters.player.running.upLeft":    { x: -96,	y: -96 },

	"characters.player.standing.up":        { x: -96,	y: -96 },
	"characters.player.standing.upRight":   { x: -96,	y: -96 },
	"characters.player.standing.right":     { x: -96,	y: -96 },
	"characters.player.standing.downRight": { x: -96,	y: -96 },
	"characters.player.standing.down":      { x: -96,	y: -96 },
	"characters.player.standing.downLeft":  { x: -96,	y: -96 },
	"characters.player.standing.left":      { x: -96,	y: -96 },
	"characters.player.standing.upLeft":    { x: -96,	y: -96 },

	"characters.player.dying.up":        { x: -96,	y: -96 },
	"characters.player.dying.upRight":   { x: -96,	y: -96 },
	"characters.player.dying.right":     { x: -96,	y: -96 },
	"characters.player.dying.downRight": { x: -96,	y: -96 },
	"characters.player.dying.down":      { x: -96,	y: -96 },
	"characters.player.dying.downLeft":  { x: -96,	y: -96 },
	"characters.player.dying.left":      { x: -96,	y: -96 },
	"characters.player.dying.upLeft":    { x: -96,	y: -96 },

	"characters.player.beingDead.up":        { x: -96,	y: -96 },
	"characters.player.beingDead.upRight":   { x: -96,	y: -96 },
	"characters.player.beingDead.right":     { x: -96,	y: -96 },
	"characters.player.beingDead.downRight": { x: -96,	y: -96 },
	"characters.player.beingDead.down":      { x: -96,	y: -96 },
	"characters.player.beingDead.downLeft":  { x: -96,	y: -96 },
	"characters.player.beingDead.left":      { x: -96,	y: -96 },
	"characters.player.beingDead.upLeft":    { x: -96,	y: -96 },

	"characters.player.beingHit.up":        { x: -96,	y: -96 },
	"characters.player.beingHit.upRight":   { x: -96,	y: -96 },
	"characters.player.beingHit.right":     { x: -96,	y: -96 },
	"characters.player.beingHit.downRight": { x: -96,	y: -96 },
	"characters.player.beingHit.down":      { x: -96,	y: -96 },
	"characters.player.beingHit.downLeft":  { x: -96,	y: -96 },
	"characters.player.beingHit.left":      { x: -96,	y: -96 },
	"characters.player.beingHit.upLeft":    { x: -96,	y: -96 },

	"environment.dirt.0": { x: -384,	y: -384 },
	"environment.dirt.1": { x: -384,	y: -384 },
	"environment.dirt.2": { x: -384,	y: -384 },
	"environment.dirt.3": { x: -384,	y: -384 },
	"environment.dirt.4": { x: -384,	y: -384 },
	"environment.dirt.5": { x: -384,	y: -384 },
	"environment.dirt.6": { x: -384,	y: -384 },
	"environment.dirt.7": { x: -384,	y: -384 },
	"environment.dirt.8": { x: -384,	y: -384 },
	"environment.dirt.9": { x: -384,	y: -384 },

	...Object.fromEntries(Object.entries(flatEnvironmentConfigItems).map(entry => {
		return [
			entry[0],
			{
				// Values must be negated, since they are expressed in different terms.
				// In the json data they are expressed as point offset compared to the image
				// boundaries.
				// In the game, they are expressed as image negative offset to displace the image.
				x: -entry[1].center.x,
				y: -entry[1].center.y,
			},
		];
	})),
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
 * Offsets used to determine the center of the entity compared to its view.
 * The center of an entity corresponds to coordinates in the game world, and has nothing to
 * do with the center of a view. It corresponds for example to the feet of a character, which might
 * not be represented at the center of the sprite. These offsets are used to make it seem as the entity
 * is centered on the coordinates.
 */
export const ENTITIES_CENTER_OFFSETS: Record<string, TCoordinates> = Object.assign(
	{},
	HITBOXES_CENTER_OFFSETS,
	SPRITES_CENTER_OFFSETS,
	BORDERS_CENTER_OFFSETS,
);