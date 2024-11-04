import { describe, expect, test } from "vitest";
import { assetsManager } from "./assetsManager.singletons";

describe("assetsManager", () => {
	test("Cannot access spritesheets before loading them", async () => {
		expect(() => assetsManager.spritesheets).toThrowError();
	});

	test("Can access spritesheets after loading them", async () => {
		await assetsManager.loadSpritesheets();
		expect(assetsManager.spritesheets).toBeTruthy();
	});
});