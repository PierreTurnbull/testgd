import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { DIRECTION8_ANGLES } from "@root/app/common/constants/space.constants";

export const getRequestedDirection = (
	keyboard: CKeyboard["keyboard"],
	joystickAngle?: TDirection | null,
): TDirection | null => {
	// joystick angle

	if (joystickAngle !== null && joystickAngle !== undefined) {
		return joystickAngle;
	}

	// keyboard

	let requestedDirection: TDirection | null = null;

	let leftKey: boolean = keyboard.KeyA;
	let rightKey: boolean = keyboard.KeyD;
	let upKey: boolean = keyboard.KeyW;
	let downKey: boolean = keyboard.KeyS;

	// conflicting axis prevent movement on them

	if (leftKey && rightKey) {
		leftKey = false;
		rightKey = false;
	}
	if (upKey && downKey) {
		upKey = false;
		downKey = false;
	}

	// diagonals

	if (upKey && leftKey) requestedDirection = DIRECTION8_ANGLES.upLeft;
	else if (upKey && rightKey) requestedDirection = DIRECTION8_ANGLES.upRight;
	else if (downKey && leftKey) requestedDirection = DIRECTION8_ANGLES.downLeft;
	else if (downKey && rightKey) requestedDirection = DIRECTION8_ANGLES.downRight;

	// axis

	else if (leftKey) requestedDirection = DIRECTION8_ANGLES.left;
	else if (upKey) requestedDirection = DIRECTION8_ANGLES.up;
	else if (rightKey) requestedDirection = DIRECTION8_ANGLES.right;
	else if (downKey) requestedDirection = DIRECTION8_ANGLES.down;

	return requestedDirection;
};