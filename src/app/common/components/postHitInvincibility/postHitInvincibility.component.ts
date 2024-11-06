import { POST_HIT_INVINCIBILITY_TIME } from "../../constants/damage.constants";
import { Component } from "../component.models";

/**
 * Invincibility after being damaged.
 */
export class CPostHitInvincibility extends Component {
	/**
	 * Timer before the invincibility ends.
	 */
	private _timer: number | null = null;

	get timer() {
		return this._timer;
	}
	
	setInvincibility() {
		if (this._timer !== null) {
			clearTimeout(this._timer);
		}

		const id = setTimeout(() => {
			this._timer = null;
		}, POST_HIT_INVINCIBILITY_TIME);

		this._timer = Number(id);
	}

	get isInvincible() {
		return this._timer !== null;
	}
}