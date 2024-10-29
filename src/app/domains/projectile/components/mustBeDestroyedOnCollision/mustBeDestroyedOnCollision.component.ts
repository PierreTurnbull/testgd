import { Component } from "../../../../common/components/component.models";

export class CMustBeDestroyedOnCollision extends Component {
	constructor(
		mustBeDestroyedOnCollision: boolean,
	) {
		super();

		this.mustBeDestroyedOnCollision = mustBeDestroyedOnCollision;
	}

	/**
	 * Whether the entity must be destroyed when it collides with another entity.
	 */
	mustBeDestroyedOnCollision: boolean;
}
