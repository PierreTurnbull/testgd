import { TPoint } from "@root/app/features/math/types/point.type";
import { describe, expect, test } from "vitest";
import { TViewSortingCurve } from "../../types/viewSortingCurve.types";
import { addIntervalExtremities } from "./addIntervalExtremities";

describe.only("addIntervalExtremities", () => {
	test("Interval starts with a, ends with b", () => {
		const aPoints: TPoint[] = [];
		const bPoints: TPoint[] = [];
		const aCurve: TViewSortingCurve = [{ x: 0, y: 0 }, { x: 2, y: 0 }];
		const bCurve: TViewSortingCurve = [{ x: 1, y: 0 }, { x: 3, y: 0 }];
		const xInterval = { start: 1, end: 2 };

		addIntervalExtremities(aPoints, bPoints, aCurve, bCurve, xInterval);

		expect(aPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }]);
	});

	test("Interval starts with a, ends with a", () => {
		const aPoints: TPoint[] = [];
		const bPoints: TPoint[] = [];
		const aCurve: TViewSortingCurve = [{ x: 0, y: 0 }, { x: 3, y: 0 }];
		const bCurve: TViewSortingCurve = [{ x: 1, y: 0 }, { x: 2, y: 0 }];
		const xInterval = { start: 1, end: 2 };

		addIntervalExtremities(aPoints, bPoints, aCurve, bCurve, xInterval);

		expect(aPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }]);
	});

	test("Curves have multiple points", () => {
		const aPoints: TPoint[] = [{ x: 2, y: 0 }];
		const bPoints: TPoint[] = [{ x: 2, y: 0 }];
		const aCurve: TViewSortingCurve = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }];
		const bCurve: TViewSortingCurve = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }];
		const xInterval = { start: 1, end: 3 };

		addIntervalExtremities(aPoints, bPoints, aCurve, bCurve, xInterval);

		expect(aPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]);
	});
});