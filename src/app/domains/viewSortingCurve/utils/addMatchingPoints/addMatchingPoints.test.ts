import { TPoint } from "@root/app/common/types/point.type";
import { describe, expect, test } from "vitest";
import { addMatchingPoints } from "./addMatchingPoints";

describe("addMatchingPoints", () => {
	test("Add matching points on both curves", () => {
		const aPoints: TPoint[] = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }];
		const bPoints: TPoint[] = [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }];

		addMatchingPoints(aPoints, bPoints);

		expect(aPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }]);
	});
});