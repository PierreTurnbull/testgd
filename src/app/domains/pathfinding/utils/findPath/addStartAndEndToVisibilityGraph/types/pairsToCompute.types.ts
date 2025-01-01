import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";

export type TPairToCompute = {
    nodeA: TVisibilityGraphNode
    nodeB: TVisibilityGraphNode
}

export type TPairsToCompute = Record<string, TPairToCompute>

export type TPairsToComputeEntries = [string, TPairToCompute][]