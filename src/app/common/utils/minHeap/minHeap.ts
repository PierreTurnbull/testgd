export class MinHeap<T> {
	constructor(
		comparator: (a: T, b: T) => number,
	) {
		this.comparator = comparator;
	}

	values:             T[] = [];
	private comparator: (a: T, b: T) => number;

	private getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}

	private getLeftChildIndex(index: number) {
		return (index * 2) + 1;
	}

	private getRightChildIndex(index: number) {
		return (index * 2) + 2;
	}

	insert(value: T) {
		this.values.push(value);
		this.heapifyUp(this.values.length - 1);
	}

	private swap(a: number, b: number) {
		[this.values[a], this.values[b]] = [this.values[b], this.values[a]];
	}

	private heapifyUp(index: number) {
		if (index === 0) return;

		const parentIndex = this.getParentIndex(index);

		const currentValue = this.values[index];
		const parentValue = this.values[parentIndex];

		if (this.comparator(currentValue, parentValue) < 0) {
			this.swap(index, parentIndex);
		}

		this.heapifyUp(parentIndex);
	}

	private heapifyDown(index: number) {
		const leftChildIndex = this.getLeftChildIndex(index);
		const rightChildIndex = this.getRightChildIndex(index);
		
		const leftChildValue = this.values[leftChildIndex];
		const rightChildValue = this.values[rightChildIndex];

		let nextIndex: number = index;

		if (leftChildValue !== undefined && this.comparator(leftChildValue, this.values[nextIndex]) < 0) {
			nextIndex = leftChildIndex;
		}
		if (rightChildValue !== undefined && this.comparator(rightChildValue, this.values[nextIndex]) < 0) {
			nextIndex = rightChildIndex;
		}

		if (nextIndex !== index) {
			this.swap(index, nextIndex);
			this.heapifyDown(nextIndex);
		}
	}

	extractMin(): T | null {
		if (this.values.length === 0) return null;
		if (this.values.length === 1) return this.values.pop()!;
	
		const min = this.values[0];
		this.values[0] = this.values.pop()!;
		this.heapifyDown(0);
	
		return min;
	}

	isEmpty() {
		return this.values.length === 0;
	}
}