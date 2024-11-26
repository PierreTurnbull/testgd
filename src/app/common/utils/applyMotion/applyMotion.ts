import { getConstrainedCoordinates } from "@root/app/domains/hitbox/utils/getConstrainedCoordinates/getConstrainedCoordinates";
import { applyNextCoordinates } from "../applyNextCoordinates/applyNextCoordinates";
import { Entity } from "../../entities/entity.models";
import { TCoordinates } from "../../types/coordinates.types";

/**
 * Applies motion to the entity.
 */
export const applyMotion = (
	entity: Entity,
	nextCoordinates: TCoordinates,
) => {
	const constrainedNextCoordinates = getConstrainedCoordinates(
		entity,
		nextCoordinates,
	);

	applyNextCoordinates(
		entity,
		constrainedNextCoordinates,
	);
};