import { TCoordinates } from "../../types/coordinates.types";
import { Component } from "../component.models";

export class CLocation extends Component {
	/**
	 * Coordinates of the entity. Coordinates correspond to the center of the entity.
	 * These coordinates do not correspond to the bounds of views that are associated with it.
	 * For example, a Sprite containing a character has some offsets associated with it to make
	 * it seem like their feet are centered on the coordinates.
	 */
	coordinates: TCoordinates = {
		x: 0,
		y: 0,
	};
}
