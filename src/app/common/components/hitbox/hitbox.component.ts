import { Polygon } from "detect-collisions";
import { Component } from "../component.models";

export class CHitbox extends Component {
	constructor(
		body: Polygon,
		name: string,
	) {
		super();

		this.body = body;
		this.name = name;
	}

	/**
	 * A collider body used for collision detection.
	 */
	body: Polygon;
	name: string;
}