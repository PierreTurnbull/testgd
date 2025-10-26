import { DIRECTION8_ANGLES } from "@root/app/features/math/constants/space.constants";
import { describe, expect, test } from "vitest";
import { getRequestedDirection } from "./getRequestedDirection";

describe("getRequestedDirection", () => {
	test("No input", () => {
		expect(getRequestedDirection({})).toBe(null);
	});

	test("Main axis", () => {
		expect(getRequestedDirection({ KeyW: true })).toBe(DIRECTION8_ANGLES.up);
		expect(getRequestedDirection({ KeyS: true })).toBe(DIRECTION8_ANGLES.down);
		expect(getRequestedDirection({ KeyA: true })).toBe(DIRECTION8_ANGLES.left);
		expect(getRequestedDirection({ KeyD: true })).toBe(DIRECTION8_ANGLES.right);
	});

	test("Diagonals", () => {
		expect(getRequestedDirection({ KeyW: true, KeyD: true })).toBe(DIRECTION8_ANGLES.upRight);
		expect(getRequestedDirection({ KeyW: true, KeyA: true })).toBe(DIRECTION8_ANGLES.upLeft);
		expect(getRequestedDirection({ KeyS: true, KeyD: true })).toBe(DIRECTION8_ANGLES.downRight);
		expect(getRequestedDirection({ KeyS: true, KeyA: true })).toBe(DIRECTION8_ANGLES.downLeft);
	});

	test("Conflicting axis prevent movement on them", () => {
		expect(getRequestedDirection({ KeyW: true, KeyS: true })).toBe(null);
		expect(getRequestedDirection({ KeyA: true, KeyD: true })).toBe(null);
	});

	test("Conflicting axis do not prevent movement on the other axis", () => {
		expect(getRequestedDirection({ KeyA: true, KeyD: true, KeyW: true })).toBe(DIRECTION8_ANGLES.up);
		expect(getRequestedDirection({ KeyA: true, KeyD: true, KeyS: true })).toBe(DIRECTION8_ANGLES.down);
		expect(getRequestedDirection({ KeyW: true, KeyS: true, KeyA: true })).toBe(DIRECTION8_ANGLES.left);
		expect(getRequestedDirection({ KeyW: true, KeyS: true, KeyD: true })).toBe(DIRECTION8_ANGLES.right);
	});
});