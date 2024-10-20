import { createMuddyBuddy } from "@root/app/domains/muddyBuddy/utils/createMuddyBuddy";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";

export const initCharacters = () => {
	createPlayer(
		{
			x: 300,
			y: 300,
		},
	);
	createMuddyBuddy(
		{
			x: 50,
			y: 50,
		},
	);
	createMuddyBuddy(
		{
			x: 300,
			y: 150,
		},
	);
	createMuddyBuddy(
		{
			x: 290,
			y: 150,
		},
	);
	// createMuddyBuddy(
	// 	{
	// 		x: 400,
	// 		y: 500,
	// 	},
	// );
};