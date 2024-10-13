import { createMuddyBuddy } from "@root/app/domains/muddyBuddy/utils/createMuddyBuddy";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";

export const initCharacters = () => {
	createPlayer(
		{
			x: 300,
			y: 250,
		},
	);
	createMuddyBuddy(
		{
			x: 300,
			y: 200,
		},
	);
	createMuddyBuddy(
		{
			x: 400,
			y: 500,
		},
	);
};