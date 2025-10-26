import { TPoint } from "@root/app/features/math/types/point.type";
import { describe, expect, test } from "vitest";
import { getPointIsInPolygon } from "./getPointIsInPolygon";

describe("getPointIsInPolygon", () => {
	/**
	 *   A ->
	 * * - *
	 * |   |
	 * * - *
	 */
	test("The point is outside of the polygon", () => {
		const point: TPoint = { x: 0, y: 0 };
		const polygon: TPoint[] = [
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
			{ x: 0, y: 2 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(false);
	});

	/**
	 *   * - *
	 * A | - | ->
	 *   * - *
	 */
	test("The point is outside of the polygon, and ray casting crosses the polygon", () => {
		const point: TPoint = { x: 0, y: 0 };
		const polygon: TPoint[] = [
			{ x: 1, y: -1 },
			{ x: 2, y: -1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 1 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(false);
	});

	/**
	 * A * ->
	 *  / \
	 * * - *
	 */
	test("The point is outside of the polygon, and ray casting crosses a point of the polygon", () => {
		const point: TPoint = { x: 0, y: 0 };
		const polygon: TPoint[] = [
			{ x: 0, y: 1 },
			{ x: 1, y: 0 },
			{ x: 2, y: 1 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(false);
	});

	/**
	 * A * - * ->
	 *   |   |
	 *   * - *
	 */
	test("The point is outside of the polygon, and ray casting is collinear with one edge of the polygon", () => {
		const point: TPoint = { x: 0, y: 0 };
		const polygon: TPoint[] = [
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 1, y: 1 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(false);
	});

	/**
	 * * - *
	 * | A | ->
	 * * - *
	 */
	test("The point is inside of the polygon", () => {
		const point: TPoint = { x: 1, y: 1 };
		const polygon: TPoint[] = [
			{ x: 0, y: 0 },
			{ x: 2, y: 0 },
			{ x: 2, y: 2 },
			{ x: 0, y: 2 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(true);
	});

	/**
	 * *
	 * |\
	 * | \
	 * |  \
	 * | A * ->
	 * |  /
	 * | /
	 * |/
	 * *
	 */
	test("The point is inside of the polygon, and the ray casting crosses a point of the polygon", () => {
		const point: TPoint = { x: 1, y: 1 };
		const polygon: TPoint[] = [
			{ x: 0, y: 0 },
			{ x: 2, y: 1 },
			{ x: 0, y: 2 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(true);
	});

	/**
	 * * - A ->
	 * |   |
	 * * - *
	 */
	test("The point is a point of the polygon", () => {
		const point: TPoint = { x: 1, y: 0 };
		const polygon: TPoint[] = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(true);
	});

	/**
	 * * - *
	 * |   A ->
	 * * - *
	 */
	test("The point is on an edge of the polygon", () => {
		const point: TPoint = { x: 1, y: 1 };
		const polygon: TPoint[] = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 2 },
			{ x: 0, y: 2 },
		];
		const result = getPointIsInPolygon(point, polygon);

		expect(result).toBe(true);
	});
});