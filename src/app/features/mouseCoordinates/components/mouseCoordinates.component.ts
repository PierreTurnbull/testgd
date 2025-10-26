import { Text } from "pixi.js";
import { Component } from "../../../ecs/components/models/component.models";
import { TCoordinates } from "../../math/types/coordinates.types";

export class CMouseCoordinates extends Component {
	mouseCoordinates: TCoordinates = { x: 0, y: 0 };
	private _text:    Text | null = null;
	get text() {
		if (!this._text) {
			throw new Error("Missing text.");
		}

		return this._text;
	}
	set text(value) {
		this._text = value;
	}
}