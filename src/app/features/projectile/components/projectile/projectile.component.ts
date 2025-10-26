import { Component } from "@root/app/ecs/components/models/component.models";
import { TProjectileType } from "@root/app/features/projectile/types/projectile.types";

export class CProjectile extends Component {
	constructor(type: TProjectileType) {
		super();

		this.type = type;
	}

	type: TProjectileType;
}