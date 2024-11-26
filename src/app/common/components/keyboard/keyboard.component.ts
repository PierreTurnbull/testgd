import { Component } from "../component.models";
import { TDirection } from "../direction/types/direction.types";
import { TKeyboard } from "./types/keyboard.types";

export class CKeyboard extends Component {
	/**
	 * Inputs in the format of keyboard keys.
	 */
	keyboard:               TKeyboard = {};
	private _joystickAngle: TDirection | null = null;
	get joystickAngle(): TDirection | null {
		return this._joystickAngle;
	}
	set joystickAngle(value: TDirection | null) {
		this._joystickAngle = value ? Math.round(value) : value;
	}
}