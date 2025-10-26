import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { getConstrainedCoordinates } from "@root/app/features/hitbox/utils/getConstrainedCoordinates/getConstrainedCoordinates";
import { TCoordinates } from "../../../math/types/coordinates.types";
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