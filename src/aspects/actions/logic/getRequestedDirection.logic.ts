import { TDirection } from "../types/actions.types";

export const getRequestedDirection = (keyboard: Record<string, boolean>): TDirection | null => {
	let requestedDirection: TDirection | null = null;

	let leftKey: boolean = keyboard.KeyA;
	let rightKey: boolean = keyboard.KeyD;
	let upKey: boolean = keyboard.KeyW;
	let downKey: boolean = keyboard.KeyS;

	// conflicting axis prevent movement on axis
	if (leftKey && rightKey) {
		leftKey = false;
		rightKey = false;
	}
	if (upKey && downKey) {
		upKey = false;
		downKey = false;
	}

	// diagonals
	if (upKey && leftKey) requestedDirection = "upLeft";
	else if (upKey && rightKey) requestedDirection = "upRight";
	else if (downKey && leftKey) requestedDirection = "downLeft";
	else if (downKey && rightKey) requestedDirection = "downRight";

	// axis
	else if (leftKey) requestedDirection = "left";
	else if (upKey) requestedDirection = "up";
	else if (rightKey) requestedDirection = "right";
	else if (downKey) requestedDirection = "down";

	return requestedDirection;
};