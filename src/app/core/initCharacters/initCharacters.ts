import { createMuddyBuddy } from "@root/app/domains/muddyBuddy/utils/createMuddyBuddy";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app.constants";
import { DIRECTIONS8 } from "@root/app/common/constants/space.constants";

export const initCharacters = () => {
	createPlayer({ x: 30, y: 50 }, 180);
	// createMuddyBuddy({ x: 200, y: 200 }, "down");
	// createMuddyBuddy({ x: 300, y: 150 }, "downRight");
	// createMuddyBuddy({ x: 490, y: 150 }, "upLeft");
	// createMuddyBuddy({ x: 540, y: 190 }, "upLeft");
	// createMuddyBuddy({ x: 100, y: 100 }, "left");
	// createMuddyBuddy({ x: 100, y: 50 }, 180);
	
	createMuddyBuddy({ x: -500, y: 50 }, 180);
	createMuddyBuddy({ x: -500, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);

	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: -50, y: 50 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 1250, y: 400 }, 180);
	// createMuddyBuddy({ x: 180, y: -100 }, 180);
	// createMuddyBuddy({ x: 210, y: 0 }, 180);
	
	// createMuddyBuddy({ x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT }, DIRECTIONS[Math.floor(Math.random() * 8)]);
	// createMuddyBuddy({ x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT }, DIRECTIONS[Math.floor(Math.random() * 8)]);
	// createMuddyBuddy({ x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT }, DIRECTIONS[Math.floor(Math.random() * 8)]);

	// setInterval(() => {
	// 	createMuddyBuddy({ x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT }, DIRECTIONS[Math.floor(Math.random() * 8)]);
	// }, 1000);
	// createMuddyBuddy(
	// 	{
	// 		x: 400,
	// 		y: 500,
	// 	},
	// );
};