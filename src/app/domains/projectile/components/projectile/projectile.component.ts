import { Component } from "@root/app/common/components/component.models";
import { TProjectileType } from "@root/app/domains/projectile/types/projectile.types";

export class CProjectile extends Component {
	constructor(type: TProjectileType) {
		super();

		this.type = type;
	}

	type: TProjectileType;
}