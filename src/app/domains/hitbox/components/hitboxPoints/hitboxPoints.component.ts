import { TPoint } from "@root/app/common/types/point.type";
import { Component } from "../../../../common/components/component.models";

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