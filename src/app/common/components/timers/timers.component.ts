import { Component } from "../component.models";

export class CTimers extends Component {
	private _timers: number[] = [];

	get timers() {
		return this._timers;
	}
	
	setTimer(value: NodeJS.Timeout) {
		this._timers.push(Number(value));
	}
}