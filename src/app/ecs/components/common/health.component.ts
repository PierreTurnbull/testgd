import { Component } from "../../../ecs/components/models/component.models";

export class CHealth extends Component {
	constructor(initialHealth: number) {
		super();

		this.health = initialHealth;
	}

	health: number;
}
