import { describe, expect, test } from "vitest";
import { assetsManager } from "./assetsManager.singletons";

describe("assetsManager", () => {
	test("Cannot access assets before loading them", async () => {
		expect(() => assetsManager.spritesheets).toThrowError();
		expect(() => assetsManager.textures).toThrowError();
	});

	test("Can access assets after loading them", async () => {
		await assetsManager.loadAssets();
		expect(assetsManager.spritesheets).toBeTruthy();
		expect(assetsManager.textures).toBeTruthy();
	});
});