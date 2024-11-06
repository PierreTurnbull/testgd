import { Component } from "../component.models";
import { TDirection } from "../direction/types/direction.types";

export class CKnockbackDirection extends Component {
	constructor(direction: TDirection) {
		super();

		this.direction = direction;
	}

	direction: TDirection;
}