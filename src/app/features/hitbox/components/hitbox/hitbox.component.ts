import { Polygon } from "detect-collisions";
import { Component } from "../../../../ecs/components/models/component.models";
import { THitboxSettings } from "../../types/hitbox.types";

export class CHitbox extends Component {
	constructor(
		body: Polygon,
		type: THitboxSettings["type"],
		name: string,
	) {
		super();

		this.body = body;
		this.type = type;
		this.name = name;
	}

	/**
	 * A collider body used for collision detection.
	 */
	body: Polygon;
	type: THitboxSettings["type"];
	name: string;
}