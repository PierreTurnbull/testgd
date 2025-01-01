import { TVisibilityGraphNode } from "@root/app/domains/pathfinding/types/visibilityGraph.types";
import { getPointKey } from "../../../common/getPointKey";
import { TCoordinates } from "@root/app/common/types/coordinates.types";

/**
 * Returns the bases of the start and end nodes.
 */
export const getNodeBases = (
	from: TCoordinates,
	to: TCoordinates,
	toArea?: TCoordinates[],
) => {
	const fromNode: TVisibilityGraphNode = {
		key:           getPointKey(from),
		point:         from,
		shapeSiblings: [],
		linkedNodes:   [],
		isSuccess:     false,
	};
	const toNode: TVisibilityGraphNode = {
		key:           getPointKey(to),
		point:         to,
		shapeSiblings: [],
		linkedNodes:   [],
		isSuccess:     true,
	};
	const toAreaNodes: TVisibilityGraphNode[] | null = toArea
		? toArea.map(point => {
			return {
				key:           getPointKey(point),
				point:         point,
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     true,
			};
		})
		: null;

	return {
		fromNode,
		toNode,
		toAreaNodes,
	};
};