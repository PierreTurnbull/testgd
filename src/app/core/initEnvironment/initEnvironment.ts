import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";
import { createRockLG } from "@root/app/domains/rockLG/utils/createRockLG";
import { gameData } from "@root/app/gameData/gameData";

export const initEnvironment = () => {
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			initSprite("environment.dirt." + Math.floor(Math.random() * 10), {
				x: j * 256 * 3,
				y: i * 256 * 3,
			});
		}
	}

	gameData.environment.forEach(environment => {
		if (environment.name === "rockLG") {
			createRockLG(environment.coordinates, environment.variant, environment.direction8);
		}
	});

	// createRockMD({ x: -527, y: -180 }, 0);
	// createRockLG({ x: 20, y: 30 }, 0, "up");
	// createRockLG({ x: -20, y: -30 }, 0, "upRight");
	// createRockLG({ x: 0, y: 0 }, 0, "right");
	// createRockLG({ x: 0, y: 0 }, 0, "downRight");
	// createRockLG({ x: 0, y: 0 }, 0, "down");
	// createRockLG({ x: 0, y: 0 }, 0, "downLeft");
	// createRockLG({ x: 0, y: 0 }, 0, "left");
	// createRockLG({ x: 0, y: 0 }, 0, "upLeft");

	// createRockLG({ x: 0, y: 0 }, 1, "up");
	// createRockLG({ x: 0, y: 0 }, 1, "upRight");
	// createRockLG({ x: 0, y: 0 }, 1, "right");
	// createRockLG({ x: 0, y: 0 }, 1, "downRight");
	// createRockLG({ x: 0, y: 0 }, 1, "down");
	// createRockLG({ x: 0, y: 0 }, 1, "downLeft");
	// createRockLG({ x: 0, y: 0 }, 1, "left");
	// createRockLG({ x: 0, y: 0 }, 1, "upLeft");

	// createRockLG({ x: 0, y: 0 }, 2, "up");
	// createRockLG({ x: 0, y: 0 }, 2, "upRight");
	// createRockLG({ x: 0, y: 0 }, 2, "right");
	// createRockLG({ x: 0, y: 0 }, 2, "downRight");
	// createRockLG({ x: 0, y: 0 }, 2, "down");
	// createRockLG({ x: 0, y: 0 }, 2, "downLeft");
	// createRockLG({ x: 0, y: 0 }, 2, "left");
	// createRockLG({ x: 0, y: 0 }, 2, "upLeft");

	// createRockLG({ x: 0, y: 0 }, 3, "up");
	// createRockLG({ x: 0, y: 0 }, 3, "upRight");
	// createRockLG({ x: 0, y: 0 }, 3, "right");
	// createRockLG({ x: 0, y: 0 }, 3, "downRight");
	// createRockLG({ x: 0, y: 0 }, 3, "down");
	// createRockLG({ x: 0, y: 0 }, 3, "downLeft");
	// createRockLG({ x: 0, y: 0 }, 3, "left");
	// createRockLG({ x: 0, y: 0 }, 3, "upLeft");
};