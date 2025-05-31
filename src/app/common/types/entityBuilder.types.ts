import { Entity } from "../../domains/entity/entity.models";
import { TDirection8 } from "../components/direction/types/direction.types";
import { TCoordinates } from "./coordinates.types";

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