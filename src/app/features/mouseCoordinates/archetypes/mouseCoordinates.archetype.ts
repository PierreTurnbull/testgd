import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CMouseCoordinates } from "../components/mouseCoordinates.component";

/**
 * The mouse coordinate debug tooltip.
 */
export class AMouseCoordinates extends Archetype {
	constructor() {
		super([
			CMouseCoordinates,
		]);
	}
}

export const mouseCoordinatesArchetype = new AMouseCoordinates();