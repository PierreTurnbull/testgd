import { Component } from "../component.models";
import { TDirection } from "./types/direction.types";

export class CDirection extends Component {
	constructor(
		initialDirection: TDirection = "down",
	) {
		super();

		this.direction = initialDirection;
	}

	direction: TDirection;
}
