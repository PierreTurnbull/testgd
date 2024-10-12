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
			x: 200,
			y: 200,
		},
	);
};