import { Component } from "../component.models";

export class CAction extends Component {
	constructor(
		initialAction: string,
		availableActions: string[],
	) {
		super();

		this._currentAction = initialAction;
		this.availableActions = availableActions;
	}

	availableActions: string[] = [];

	private _currentAction: string;
	get currentAction() {
		return this._currentAction;
	}
	set currentAction(value) {
		if (!this.availableActions.includes(value)) throw new Error(`Action ${value} not available.`);
		
		this._currentAction = value;
		this._updatedAt = new Date().getTime();
	}

	private _updatedAt: number = new Date().getTime();
	get updatedAt() {
		return this._updatedAt;
	}
}