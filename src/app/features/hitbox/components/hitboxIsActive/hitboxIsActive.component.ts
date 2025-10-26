import { Component } from "../../../../ecs/components/models/component.models";

export class CHitboxIsActive extends Component {
	constructor(
		hitboxIsActive: boolean,
	) {
		super();

		this.hitboxIsActive = hitboxIsActive;
	}

	/**
	 * Whether the hitbox entity is active, meaning that it can collide with other colliders.
	 */
	hitboxIsActive: boolean;
}
