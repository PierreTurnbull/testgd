import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TDimensions } from "@root/app/features/math/types/dimensions.types";
import { TDirection } from "../../math/types/direction.types";

export type TProjectileType = "slash" | "ram";

export type TProjectileSettings = {
	type:                            TProjectileType, // used to know the shape. slash -> quarter circle
	size?:                           number | null, // use size, or dimensions
	dimensions?:                     TDimensions | null,
	lifeDuration:                    number | null, // life duration in ms
	velocity:                        number | null,
	damage:                          number | null,
	coordinates:                     TCoordinates,
	direction:                       TDirection,
	mustBeDestroyedOnCollision:      boolean,
	motionCollisionCandidates?:      Archetype[],
	damageCollisionCandidates?:      Archetype[],
	pathfindingCollisionCandidates?: Archetype[],
	isActive:                        boolean,
}

export type TDefaultProjectileSettings = Record<
	string,
	Omit<
		TProjectileSettings,
		"coordinates" | "direction"
	>
>