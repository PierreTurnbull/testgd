import { Component } from "../component.models";

export class CHealth extends Component {
	constructor(initialHealth: number) {
		super();

		this.health = initialHealth;
	}

	health: number;
}
