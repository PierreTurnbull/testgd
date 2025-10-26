import { TDirection } from "@root/app/features/math/types/direction.types";
import { Component } from "../../../ecs/components/models/component.models";

export class CKnockbackDirection extends Component {
	constructor(direction: TDirection) {
		super();

		this.direction = direction;
	}

	direction: TDirection;
}