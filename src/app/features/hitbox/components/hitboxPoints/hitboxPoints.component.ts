import { TPoint } from "@root/app/features/math/types/point.type";
import { Component } from "../../../../ecs/components/models/component.models";

/**
 * The points of a hitbox.
 */
export class CHitboxPoints extends Component {
	constructor(
		hitboxPoints: TPoint[],
	) {
		super();

		this.hitboxPoints = hitboxPoints;
	}

	hitboxPoints: TPoint[];
}