import { Box } from "detect-collisions";
import { Component } from "../component.models";

export class CHitbox extends Component {
	private _body: Box | null = null;

	get body() {
		if (!this._body) throw new Error("Missing body.");

		return this._body;
	}
	set body(value: Box) {
		this._body = value;
	}
}