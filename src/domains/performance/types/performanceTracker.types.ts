import { Graphics } from "pixi.js";

export type TPerformanceDelta = {
	name: string
	delta: number
}

export type TPerformanceCheckpoint = {
	name: string
	startDate: Date
}

export type TPerformanceUnit = {
	startDate: Date
	checkpoints: TPerformanceCheckpoint[]
}

export type TPerformanceTracker = {
	graphics: Graphics | null
	current: TPerformanceUnit | null
	history: TPerformanceUnit[]
}