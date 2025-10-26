import { ANGLES_RANGE, DIRECTIONS8, MAIN_ANGLES } from "@root/app/features/math/constants/space.constants";
import { TDirection, TDirection8 } from "@root/app/features/math/types/direction.types";
import { Component } from "../../../ecs/components/models/component.models";

export class CDirection extends Component {
	constructor(
		initialDirection: number = 90,
	) {
		super();

		this._direction = initialDirection;

		this.direction = initialDirection;
	}

	/**
	 * The direction in degrees, from 0 to 360.
	 */
	private _direction:  TDirection;
	/**
	 * The direction along the 8 main directions: up, down, left, right, upLeft, upRight, downLeft, downRight.
	 * This property is computed from _direction.
	 */
	private _direction8: TDirection8 = DIRECTIONS8[2];
	get direction8() {
		return this._direction8;
	}
	private set direction8(value: TDirection8) {
		this._direction8 = value;
	}

	get direction() {
		return this._direction;
	}

	set direction(value: TDirection) {
		this._direction = value;

		// set direction8

		const closestAngle = Math.round(value / ANGLES_RANGE) * ANGLES_RANGE;
		const angleKey = MAIN_ANGLES.indexOf(closestAngle === 360 ? 0 : closestAngle);
		const direction8 = DIRECTIONS8[angleKey];

		this.direction8 = direction8;
	}
}
