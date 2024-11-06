import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";

export const initEnvironment = () => {
	for (let i = -5; i < 5; i++) {
		for (let j = -5; j < 5; j++) {
			initSprite("environment.dirt." + Math.floor(Math.random() * 10), {
				x: j * 256 * 3,
				y: i * 256 * 3,
			});
		}
	}
};