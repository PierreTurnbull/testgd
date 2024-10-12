import { TDimensions } from "../../types/dimensions.types";
import { Component } from "../component.models";

export class CHitbox extends Component {
	private _dimensions: TDimensions | null = null;

	get dimensions() {
		if (!this._dimensions) throw new Error("Missing dimensions.");

		return this._dimensions;
	}
	set dimensions(value: TDimensions) {
		this._dimensions = value;
	}
}