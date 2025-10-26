import { Component } from "../../../ecs/components/models/component.models";

export class CDamage extends Component {
	constructor(initialDamage: number) {
		super();

		this.damage = initialDamage;
	}

	damage: number;
}
