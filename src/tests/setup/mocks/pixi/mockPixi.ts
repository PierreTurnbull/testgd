import type * as TPixi from "pixi.js";

/**
 * Mocks pixi.js
 */
export const mockPixi = async (importOriginal: () => Promise<typeof TPixi>) => {
	const original = await importOriginal();

	return {
		...original,
		Assets: {
			async load() { return {}; },
		},
		Spritesheet: class Spritesheet {
			async parse() { return {}; }
			animations = {};
		},
		AnimatedSprite: class AnimatedSprite {
			play() {}
			emit() {}
			depthOfChildModified() {}
			destroy() {}
			removeFromParent() {}
		},
	};
};