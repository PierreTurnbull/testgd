import { Component } from "../../../../common/components/component.models";

export class CProjectileIsActive extends Component {
	constructor(
		projectileIsActive: boolean,
	) {
		super();

		this.projectileIsActive = projectileIsActive;
	}

	/**
	 * Whether the projectile entity is active, meaning that it can deal some damage to colliders.
	 */
	projectileIsActive: boolean;
}
