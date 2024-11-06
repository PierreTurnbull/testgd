import { Archetype } from "@root/app/common/archetypes/archetype.models";
import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TDimensions } from "@root/app/common/types/dimensions.types";

export type TProjectileType = "slash" | "ram";

export type TProjectileSettings = {
	type:                       TProjectileType, // used to know the shape. slash -> quarter circle
	size?:                      number | null, // use size, or dimensions
	dimensions?:                TDimensions | null,
	lifeDuration:               number | null, // life duration in ms
	velocity:                   number | null,
	damage:                     number | null,
	coordinates:                TCoordinates,
	direction:                  TDirection,
	mustBeDestroyedOnCollision: boolean,
	collisionCandidates:        Archetype[],
	isActive:                   boolean,
}

export type TDefaultProjectileSettings = Record<
	string,
	Omit<
		TProjectileSettings,
		"coordinates" | "direction"
	>
>