import { getConstrainedCoordinates } from "@root/app/domains/hitbox/utils/getConstrainedCoordinates/getConstrainedCoordinates";
import { Entity } from "../../../domains/entity/entity.models";
import { TCoordinates } from "../../types/coordinates.types";
import { applyNextCoordinates } from "../applyNextCoordinates/applyNextCoordinates";

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