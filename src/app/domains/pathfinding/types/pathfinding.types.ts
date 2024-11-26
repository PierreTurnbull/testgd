import { TVisibilityGraphNode } from "./visibilityGraph.types";

export type TGraphNode = Pick<TVisibilityGraphNode, "key" | "point" | "linkedNodes" | "isSuccess"> & {
	distance:                number
	totalDistanceEstimation: number
	parent:                  TGraphNode | null
}