import { TDirection } from "@root/domains/_/types/action/direction.type";
import { Monster1 } from "../characters/monster.characters";
import { getRequestedDirection } from "@root/aspects/actions/logic/getRequestedDirection.logic";

export const setMonster1ActionFromKeyboard = (monster1: Monster1) => {
	const requestsMovement = monster1.keyboard.KeyA || monster1.keyboard.KeyW || monster1.keyboard.KeyD || monster1.keyboard.KeyS;
	const requestedDirection: TDirection | null = getRequestedDirection(monster1.keyboard);
	const requestsSameDirection = requestedDirection === monster1.direction;
	const isAlreadyRollingInSameDirection = monster1.isRolling && requestsSameDirection;

	const requestsRolling = monster1.canRoll && !isAlreadyRollingInSameDirection && requestedDirection !== null;

	if (requestsRolling) monster1.replaceAction("rolling", requestedDirection);
};