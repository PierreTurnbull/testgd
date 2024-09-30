import { getRequestedDirection } from "@root/aspects/actions/logic/getRequestedDirection.logic";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";

export const setPlayerActionFromKeyboard = () => {
	const requestedDirection: TDirection | null = getRequestedDirection(game.player.keyboard);
	const requestsMovement = requestedDirection !== null;
	const requestsSameDirectionAsPreviously = requestedDirection === game.player.direction;
	const isAlreadyRunningInSameDirection = game.player.isRunning && requestsSameDirectionAsPreviously;

	// const requestsAttacking = game.player.canStartAttacking && game.player.keyboard.Comma;
	const requestsRunning = !isAlreadyRunningInSameDirection && requestedDirection !== null;
	const requestsStanding = !requestsMovement;

	// if (requestsAttacking) {
	// 	game.player.replaceAction("attacking", game.player.direction || "down");
	// }
	if (requestsRunning && game.player.canStartRunning) {
		game.player.startRunning(requestedDirection || "down");
	} else if (requestsStanding && game.player.canStartStanding) {
		game.player.startStanding(game.player.direction || "down");
	}
};