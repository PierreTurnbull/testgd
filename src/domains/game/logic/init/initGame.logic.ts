import { loadAnimatedSprites } from "@root/domains/viewContainer/children/animatedSprite/logic/loadAnimatedSprites/loadAnimatedSprites";
import { initOrganisms } from "./initOrganisms.logic";

export const initGame = async () => {
	await loadAnimatedSprites();
	initOrganisms();
};