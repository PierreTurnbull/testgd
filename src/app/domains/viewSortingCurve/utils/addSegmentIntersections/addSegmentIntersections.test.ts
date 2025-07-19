import { TPoint } from "@root/app/common/types/point.type";
import { describe, expect, test } from "vitest";
import { addSegmentIntersections } from "./addSegmentIntersections";

describe("addSegmentIntersections", () => {
	test("No intersection", () => {
		const aPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
		const bPoints: TPoint[] = [{ x: 0, y: 1 }, { x: 1, y: 1 }];

		addSegmentIntersections(aPoints, bPoints);

		expect(aPoints).toStrictEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 0, y: 1 }, { x: 1, y: 1 }]);
	});

	test("Intersection", () => {
		const aPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
		const bPoints: TPoint[] = [{ x: 0, y: 1 }, { x: 1, y: 0 }];

		addSegmentIntersections(aPoints, bPoints);

		expect(aPoints).toStrictEqual([{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }, { x: 1, y: 1 }]);
		expect(bPoints).toStrictEqual([{ x: 0, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 }]);
	});

	test("Intersection on segment extremity", () => {
		const aPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
		const bPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }];

		addSegmentIntersections(aPoints, bPoints);

		expect(aPoints).toStrictEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
	});

	test("Intersection on parallel segments", () => {
		const aPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
		const bPoints: TPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }];

		addSegmentIntersections(aPoints, bPoints);

		expect(aPoints).toStrictEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
		expect(bPoints).toStrictEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
	});
});