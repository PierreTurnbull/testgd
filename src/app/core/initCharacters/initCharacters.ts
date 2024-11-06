import { createMuddyBuddy } from "@root/app/domains/muddyBuddy/utils/createMuddyBuddy";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app.constants";
import { DIRECTIONS } from "@root/app/common/constants/space.constants";

export const initCharacters = () => {
	createPlayer({ x: 0, y: 0 });
	// createMuddyBuddy({ x: 200, y: 200 }, "down");
	// createMuddyBuddy({ x: 300, y: 150 }, "downRight");
	// createMuddyBuddy({ x: 490, y: 150 }, "upLeft");
	// createMuddyBuddy({ x: 540, y: 190 }, "upLeft");
	// createMuddyBuddy({ x: 100, y: 100 }, "left");
	createMuddyBuddy({ x: 0, y: 400 }, "left");
	
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