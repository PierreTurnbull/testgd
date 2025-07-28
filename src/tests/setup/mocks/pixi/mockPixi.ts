import type * as TPixi from "pixi.js";

/**
 * Mocks pixi.js
 */
export const mockPixi = async (importOriginal: () => Promise<typeof TPixi>) => {
	const original = await importOriginal();

	class ViewContainer {}

	return {
		...original,
		Assets: {
			async load() { return {}; },
		},
		Spritesheet: class Spritesheet extends ViewContainer {
			async parse() { return {}; }
			animations = {};
		},
		AnimatedSprite: class AnimatedSprite extends ViewContainer {
			play() {return 1;}
			stop() {}
			emit() {}
			depthOfChildModified() {}
			destroy() {}
			removeFromParent() {}
		},
		ViewContainer: ViewContainer,
	};
};