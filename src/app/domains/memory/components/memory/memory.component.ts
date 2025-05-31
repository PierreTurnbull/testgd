import { Component } from "@root/app/common/components/component.models";
import { TMemory, TMemoryItem, TMemoryItemToCreate } from "../../types/memory.types";

export class CMemory extends Component {
	private _memory: TMemory = [];

	get memory() {
		return this._memory;
	}

	addMemoryItem(memoryItemToCreate: TMemoryItemToCreate) {
		const memoryItem: TMemoryItem = {
			timestamp: new Date().getTime(),
			...memoryItemToCreate,
		};

		this._memory.push(memoryItem);
	}
}