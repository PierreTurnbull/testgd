import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { TDirection } from "@root/domains/space/types/direction.types";

/**
 * A manager that handles physical location in a 2D space.
 */
export class LocationManager {
	constructor(initialCoordinates: TCoordinates) {
		this.coordinates = initialCoordinates;
	}

	/**
	 * Sets new coordinates.
	 * @param newCoordinates 
	 */
	setCoordinates = (newCoordinates: TCoordinates) => {
		this.coordinates = {
			x: newCoordinates.x,
			y: newCoordinates.y,
		};
	};

	coordinates: TCoordinates;
	direction: TDirection = "down";
}