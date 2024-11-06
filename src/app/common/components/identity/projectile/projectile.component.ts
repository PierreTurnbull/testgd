import { TProjectileType } from "@root/app/domains/projectile/types/projectile.types";
import { Component } from "../../component.models";

export class CProjectile extends Component {
	constructor(type: TProjectileType) {
		super();

		this.type = type;
	}

	type: TProjectileType;
}