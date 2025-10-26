import { Entity } from "@root/app/ecs/entities/models/entity.models";

export type TMemoryItemType = "didHit" | "didUpdatePath"

export type TMemoryItemBase = {
	timestamp: number
	type:      TMemoryItemType
}

export type TMemoryItemDidHit = TMemoryItemBase & {
	type:   "didHit"
	victim: Entity
}

export type TMemoryItemUpdatePath = TMemoryItemBase & {
	type:           "didUpdatePath"
	nextUpdateDate: Date
}

export type TMemoryItem = (
	TMemoryItemDidHit |
	TMemoryItemUpdatePath
)

export type TMemoryItemToCreate = (
	Omit<TMemoryItemDidHit, "timestamp"> |
	Omit<TMemoryItemUpdatePath, "timestamp">
)

export type TMemory = TMemoryItem[]