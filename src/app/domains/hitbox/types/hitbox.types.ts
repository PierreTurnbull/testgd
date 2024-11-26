import { Archetype } from "@root/app/common/archetypes/archetype.models";
import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TOffset } from "@root/app/common/types/offset.types";
import { TPoint } from "@root/app/common/types/point.type";

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