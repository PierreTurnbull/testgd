import { TKeyboard } from "@root/app/features/keyboard/types/keyboard.types";
import { TDirection } from "@root/app/features/math/types/direction.types";
import { Component } from "../../../ecs/components/models/component.models";

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