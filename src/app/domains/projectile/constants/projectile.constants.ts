import { muddyBuddyArchetype } from "@root/app/common/archetypes/muddyBuddy/muddyBuddy.archetype";
import { TDefaultProjectileSettings } from "../types/projectile.types";

export const PROJECTILE_DEFAULT_SETTINGS: TDefaultProjectileSettings = {
	slash: {
		type:                       "slash",
		size:                       60,
		dimensions:                 null,
		lifeDuration:               100,
		velocity:                   0,
		damage:                     1,
		mustBeDestroyedOnCollision: true,
		isActive:                   true,
		damageCollisionCandidates:  [muddyBuddyArchetype],
	},
};