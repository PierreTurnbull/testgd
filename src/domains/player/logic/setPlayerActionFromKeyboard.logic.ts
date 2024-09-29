import { getRequestedDirection } from "@root/aspects/actions/logic/getRequestedDirection.logic";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";

export const setPlayerActionFromKeyboard = () => {
	const requestedDirection: TDirection | null = getRequestedDirection(game.player.keyboard);
	const requestsMovement = requestedDirection !== null;
	// const requestsSameDirection = requestedDirection === game.player.direction;
	// const isAlreadyRunningInSameDirection = game.player.isRunning && requestsSameDirection;

	// const requestsAttacking = game.player.canStartAttacking && game.player.keyboard.Comma;
	// const requestsRunning = game.player.canStartRunning && !isAlreadyRunningInSameDirection && requestedDirection !== null;
	const requestsStanding = game.player.canStartStanding && !requestsMovement;

	// if (requestsAttacking) {
	// 	game.player.replaceAction("attacking", game.player.direction || "down");
	// }
	// else if (requestsRunning) game.player.replaceAction("running", requestedDirection);
	// if (requestsStanding) game.player.replaceAction("standing", game.player.direction || "down");
	if (requestsStanding) {
		game.player.startStanding(game.player.direction || "down");
	}
};