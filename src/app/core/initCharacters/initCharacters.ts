import { createMuddyBuddy } from "@root/app/domains/muddyBuddy/utils/createMuddyBuddy";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";

export const initCharacters = () => {
	createPlayer();
	createMuddyBuddy(
		{
			x: 200,
			y: 200,
		},
	);
};