import { TCoordinates } from "../../types/coordinates.types";
import { Component } from "../component.models";

export class CLocation extends Component {
	constructor(
		initialCoordinates: TCoordinates,
	) {
		super();

		this.coordinates = initialCoordinates;
	}
	/**
	 * Coordinates of the entity.
	 * These coordinates do not correspond to the bounds of views that are associated with it.
	 * For example, a Sprite containing a character has some negative offsets associated with it to make
	 * it seem like their feet are centered on the coordinates. This is required because sprites are
	 * not centered on their coordinates, instead their coordinates are their top-left starting point.
	 */
	coordinates: TCoordinates;
}
