import { CMouseCoordinates } from "../../components/mouseCoordinates/mouseCoordinates.component";
import { Archetype } from "../archetype.models";

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