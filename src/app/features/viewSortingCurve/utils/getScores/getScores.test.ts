import { TPoint } from "@root/app/features/math/types/point.type";
import { describe } from "node:test";
import { expect, test } from "vitest";
import { getScores } from "./getScores";

describe("getScores", () => {
	test("aPoints is strictly higher than bPoints", () => {
		const aPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
		const bPoints: TPoint[] = [{ x: 0, y: 1 }, { x: 1, y: 1 }];

		const { aScore, bScore } = getScores(aPoints, bPoints);

		expect(aScore).toBe(0);
		expect(bScore).toBe(1);
	});

	test("aPoints and bPoints cross", () => {
		const aPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }, { x: 1, y: 1 }];
		const bPoints: TPoint[] = [{ x: 0, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 }];

		const { aScore, bScore } = getScores(aPoints, bPoints);

		expect(aScore).toBe(0.5);
		expect(bScore).toBe(0.5);
	});
});