import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";

/**
 * Returns the list of segments forming a polygonal chain
 */
export const getSegmentsFromPolygonalChain = (
	polygonalChain: TPoint[],
) => {
	const segments: TSegment[] = polygonalChain
		.slice(0, -1)
		.map((point, key) => [point, polygonalChain[key + 1]]);

	return segments;
};