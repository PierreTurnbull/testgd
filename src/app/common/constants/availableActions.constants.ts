import spritesheetsDatas from "@assets/spritesheetsDatas.json";

export const AVAILABLE_ACTIONS: Record<string, string[]> = {};

spritesheetsDatas.forEach(spritesheetData => {
	const characterName = spritesheetData.name.split(".")[1];
	const actionName = spritesheetData.name.split(".")[2];

	if (!AVAILABLE_ACTIONS[characterName]) {
		AVAILABLE_ACTIONS[characterName] = [];
	}

	if (!AVAILABLE_ACTIONS[characterName].includes(actionName)) {
		AVAILABLE_ACTIONS[characterName].push(actionName);
	}
});