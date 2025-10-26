import { Component } from "../../../ecs/components/models/component.models";

export class CTimers extends Component {
	private _timers: number[] = [];

	get timers() {
		return this._timers;
	}
	
	addTimer(value: NodeJS.Timeout) {
		this._timers.push(Number(value));
	}
}