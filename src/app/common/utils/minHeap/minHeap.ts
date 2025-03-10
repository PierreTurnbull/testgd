export class MinHeap<T> {
	constructor(
		comparator: (a: T, b: T) => number,
	) {
		this._comparator = comparator;
	}

	values:              T[] = [];
	private _comparator: (a: T, b: T) => number;

	private _getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}

	private _getLeftChildIndex(index: number) {
		return (index * 2) + 1;
	}

	private _getRightChildIndex(index: number) {
		return (index * 2) + 2;
	}

	insert(value: T) {
		this.values.push(value);
		this._heapifyUp(this.values.length - 1);
	}

	private _swap(a: number, b: number) {
		[this.values[a], this.values[b]] = [this.values[b], this.values[a]];
	}

	private _heapifyUp(index: number) {
		if (index === 0) return;

		const parentIndex = this._getParentIndex(index);

		const currentValue = this.values[index];
		const parentValue = this.values[parentIndex];

		if (this._comparator(currentValue, parentValue) < 0) {
			this._swap(index, parentIndex);
		}

		this._heapifyUp(parentIndex);
	}

	private _heapifyDown(index: number) {
		const leftChildIndex = this._getLeftChildIndex(index);
		const rightChildIndex = this._getRightChildIndex(index);
		
		const leftChildValue = this.values[leftChildIndex];
		const rightChildValue = this.values[rightChildIndex];

		let nextIndex: number = index;

		if (leftChildValue !== undefined && this._comparator(leftChildValue, this.values[nextIndex]) < 0) {
			nextIndex = leftChildIndex;
		}
		if (rightChildValue !== undefined && this._comparator(rightChildValue, this.values[nextIndex]) < 0) {
			nextIndex = rightChildIndex;
		}

		if (nextIndex !== index) {
			this._swap(index, nextIndex);
			this._heapifyDown(nextIndex);
		}
	}

	extractMin(): T | null {
		if (this.values.length === 0) return null;
		if (this.values.length === 1) return this.values.pop()!;
	
		const min = this.values[0];
		this.values[0] = this.values.pop()!;
		this._heapifyDown(0);
	
		return min;
	}

	isEmpty() {
		return this.values.length === 0;
	}
}