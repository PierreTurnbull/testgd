import { Component } from "../component.models";

/**
 * The variant of an entity. The variant gives a little bit of diversity between entities, without changing their behaviour.
 */
export class CVariant extends Component {
	constructor(
		variant: number,
	) {
		super();

		this.variant = variant;
	}

	variant: number = 0;
}