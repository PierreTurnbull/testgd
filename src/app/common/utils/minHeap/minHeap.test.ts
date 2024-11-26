import { beforeEach, describe, expect, test } from "vitest";
import { MinHeap } from "./minHeap";

describe("MinHeap", () => {
	const comparator = (a: number, b: number) => a - b;
	let heap: MinHeap<number>;

	const randomValues = [3, 2, 6, 5, 10, 4, 7, 9, 1, 8];

	beforeEach(() => {
		heap = new MinHeap(comparator);

		randomValues.forEach(value => heap.insert(value));
	});

	test("Elements are inserted in the correct order", () => {
		const values = heap.values;

		expect(values).toEqual([1, 2, 4, 3, 8, 6, 7, 9, 5, 10]);
	});

	test("extractMin returns the smallest value", () => {
		expect(heap.extractMin()).toBe(1);
		expect(heap.extractMin()).toBe(2);
		expect(heap.extractMin()).toBe(3);
		expect(heap.extractMin()).toBe(4);
		expect(heap.extractMin()).toBe(5);
		expect(heap.extractMin()).toBe(6);
		expect(heap.extractMin()).toBe(7);
		expect(heap.extractMin()).toBe(8);
		expect(heap.extractMin()).toBe(9);
		expect(heap.extractMin()).toBe(10);
	});

	test("extractMin returns null when the heap is empty", () => {
		heap = new MinHeap(comparator);

		expect(heap.extractMin()).toBe(null);
	});

	test("extractMin does not corrupt the heap property", () => {
		heap.extractMin();
		expect(heap.values).toEqual([2, 3, 4, 5, 8, 6, 7, 9, 10]);
		heap.extractMin();
		expect(heap.values).toEqual([3, 5, 4, 9, 8, 6, 7, 10]);
		heap.extractMin();
		expect(heap.values).toEqual([4, 5, 6, 9, 8, 10, 7]);
		heap.extractMin();
		expect(heap.values).toEqual([5, 7, 6, 9, 8, 10]);
		heap.extractMin();
		expect(heap.values).toEqual([6, 7, 10, 9, 8]);
		heap.extractMin();
		expect(heap.values).toEqual([7, 8, 10, 9]);
		heap.extractMin();
		expect(heap.values).toEqual([8, 9, 10]);
		heap.extractMin();
		expect(heap.values).toEqual([9, 10]);
		heap.extractMin();
		expect(heap.values).toEqual([10]);
		heap.extractMin();
		expect(heap.values).toEqual([]);
	});

	test("isEmpty", () => {
		heap = new MinHeap(comparator);
		expect(heap.isEmpty()).toBe(true);
		heap.insert(1);
		expect(heap.isEmpty()).toBe(false);
		heap.insert(2);
		expect(heap.isEmpty()).toBe(false);
	});
}); 