import { TPoint } from "@root/app/common/types/point.type";

/**
 * Returns the first and last points of a polygonal chain.
 */
export const getPolygonalChainExtremities = (
	chain: TPoint[],
) => {
	const extremities = {
		start: chain[0],
		end:   chain[chain.length - 1],
	};

	return extremities;
};