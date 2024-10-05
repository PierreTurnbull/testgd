import { Component } from "../component.models";

export class CVelocity extends Component {
	/**
	 * The velocity of each action.
	 */
	actionVelocities: Record<string, number> = {};
	velocity: number = 0;
}