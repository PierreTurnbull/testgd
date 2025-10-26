import { TDirection8 } from "@root/app/features/math/types/direction.types";
import { TCoordinates } from "../../../features/math/types/coordinates.types";
import { Entity } from "../models/entity.models";

/**
 * A function that instanciates an entity.
 * @returns the entity
 */
export type TEntityBuilder = (
	coordinates: TCoordinates,
	variant: number,
	direction8: TDirection8,
	gameEditorId?: number,
) => Entity