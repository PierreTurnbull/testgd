import { Component } from "@root/app/common/components/component.models";
import { Text } from "pixi.js";

export class CFps extends Component {
	fps:   number = 0;
	_text: Text | null = null;
	get text() {
		if (!this._text) {
			throw new Error("Missing text.");
		}

		return this._text;
	}
	set text(value) {
		this._text = value;
	}
	timeSinceLastUpdate: number = 0;
}