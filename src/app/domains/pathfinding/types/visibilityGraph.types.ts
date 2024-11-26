import { TPoint } from "@root/app/common/types/point.type";

export type TVisibilityGraphNode = {
	key:           string
	point:         TPoint
	/**
	 * Nodes that are siblings of this node and part of the same shape.
	 */
	shapeSiblings: TVisibilityGraphNode[]
	/**
	 * Nodes that are linked to this node, meaning a path exists between them and can be used for pathfinding.
	 */
	linkedNodes:   TVisibilityGraphNode[]
	isSuccess:     boolean
}