import { processMuddyBuddyAi } from "@root/app/features/muddyBuddy/systems/processMuddyBuddyAi/processMuddyBuddyAi.system";
import { playerArchetype } from "@root/app/features/player/archetypes/player.archetype";

/**
 * Generates NPCs actions.
 */
export const processAIs = () => {
	const playerEntity = [...playerArchetype.entities][0];

	processMuddyBuddyAi(playerEntity);
};