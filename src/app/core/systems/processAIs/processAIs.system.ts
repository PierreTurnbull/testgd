import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { processMuddyBuddyAI } from "./muddyBuddy/processMuddyBuddyAI";

/**
 * Generates NPCs actions.
 */
export const processAIs = () => {
	const playerEntity = [...playerArchetype.entities][0];

	processMuddyBuddyAI(playerEntity);
};