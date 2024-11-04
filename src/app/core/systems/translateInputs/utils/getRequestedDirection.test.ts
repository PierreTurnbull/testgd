import { describe, expect, test } from "vitest";
import { getRequestedDirection } from "./getRequestedDirection";

describe("getRequestedDirection", () => {
	test("No input", () => {
		expect(getRequestedDirection({})).toBe(null);
	});

	test("Main axis", () => {
		expect(getRequestedDirection({ KeyW: true })).toBe("up");
		expect(getRequestedDirection({ KeyS: true })).toBe("down");
		expect(getRequestedDirection({ KeyA: true })).toBe("left");
		expect(getRequestedDirection({ KeyD: true })).toBe("right");
	});

	test("Diagonals", () => {
		expect(getRequestedDirection({ KeyW: true, KeyD: true })).toBe("upRight");
		expect(getRequestedDirection({ KeyW: true, KeyA: true })).toBe("upLeft");
		expect(getRequestedDirection({ KeyS: true, KeyD: true })).toBe("downRight");
		expect(getRequestedDirection({ KeyS: true, KeyA: true })).toBe("downLeft");
	});

	test("Conflicting axis prevent movement on them", () => {
		expect(getRequestedDirection({ KeyW: true, KeyS: true })).toBe(null);
		expect(getRequestedDirection({ KeyA: true, KeyD: true })).toBe(null);
	});

	test("Conflicting axis do not prevent movement on the other axis", () => {
		expect(getRequestedDirection({ KeyA: true, KeyD: true, KeyW: true })).toBe("up");
		expect(getRequestedDirection({ KeyA: true, KeyD: true, KeyS: true })).toBe("down");
		expect(getRequestedDirection({ KeyW: true, KeyS: true, KeyA: true })).toBe("left");
		expect(getRequestedDirection({ KeyW: true, KeyS: true, KeyD: true })).toBe("right");
	});
});