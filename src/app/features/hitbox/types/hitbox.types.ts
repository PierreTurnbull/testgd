import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TOffset } from "@root/app/features/math/types/offset.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { TDirection } from "../../math/types/direction.types";

export type THitboxType = "motion" | "damage";

export type THitboxShape = "cone" | "rectangle" | "polygon";

export type TBaseHitboxSettings = {
	type:                            THitboxType,
	shape:                           THitboxShape,
	initialCoordinates:              TCoordinates,
	offset:                          TOffset,
	name:                            string,
	motionCollisionCandidates?:      Archetype[],
	damageCollisionCandidates?:      Archetype[],
	pathfindingCollisionCandidates?: Archetype[],
	isActive:                        boolean,
}

export type TConeHitboxSettings = TBaseHitboxSettings & {
	shape:     "cone",
	direction: TDirection,
	size:      number,
}

export type TRectangleHitboxSettings = TBaseHitboxSettings & {
	shape: "rectangle",
}

export type TPolygonHitboxSettings = TBaseHitboxSettings & {
	shape:  "polygon",
	points: TPoint[],
}

export type THitboxSettings = TConeHitboxSettings | TRectangleHitboxSettings | TPolygonHitboxSettings