import { game } from "@root/domains/game/singletons/game.singletons";

export const startPerformanceLap = () => {
	game.performanceTracker.history.splice(9);
	if (game.performanceTracker.current) game.performanceTracker.history.push(game.performanceTracker.current);
	game.performanceTracker.current = {
		startDate: new Date(),
		checkpoints: [],
	};
};