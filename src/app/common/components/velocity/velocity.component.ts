import { Component } from "../component.models";

export class CVelocity extends Component {
	constructor(
		actionVelocities: Record<string, number>,
		velocity: number = 0,
	) {
		super();

		this.actionVelocities = actionVelocities;
		this.velocity = velocity;
	}

	/**
	 * The velocity of each action available to the entity.
	 */
	actionVelocities: Record<string, number>;
	velocity: number = 0;
}