import { getRequestedDirection } from "@root/aspects/actions/logic/getRequestedDirection.logic";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { Monster1 } from "../characters/monster1.characters";

export const setMonster1ActionFromKeyboard = (monster1: Monster1) => {
	const requestedDirection: TDirection | null = getRequestedDirection(monster1.keyboard);
	const requestsMovement = requestedDirection !== null;
	const requestsSameDirectionAsPreviously = requestedDirection === monster1.direction;
	const isAlreadyRollingInSameDirection = monster1.isRolling && requestsSameDirectionAsPreviously;

	const requestsRolling = !isAlreadyRollingInSameDirection && requestedDirection !== null;
	const requestsStanding = !requestsMovement;

	if (requestsRolling && monster1.canStartRolling) {
		monster1.startRolling(requestedDirection || "down");
	} else if (requestsStanding && monster1.canStartStanding) {
		monster1.startStanding(monster1.direction || "down");
	}
};