import { TPoint } from "@root/app/features/math/types/point.type";
import { getSegmentsFromPolygonalChain } from "@root/app/features/math/utils/getSegmentsFromPolygonalChain/getSegmentsFromPolygonalChain";

/**
 * Returns the score of aPoints and bPoints. The value of a score is the x length on which the chain
 * is lower than the other. A higher score means the entity is lower on y than an entity with a
 * lower score, so it must be visually on top of it.
 * E.g.:
 * ```
 * 1---2
 * 3---4
 * ```
 * If `1-2` and `3-4` spans 10 on the x axis, then the scores are 10 to 0.
 */
export const getScores = (
	aPoints: TPoint[],
	bPoints: TPoint[],
) => {
	let aScore = 0;
	let bScore = 0;
	const aSegments = getSegmentsFromPolygonalChain(aPoints);
	const bSegments = getSegmentsFromPolygonalChain(bPoints);

	for (let i = 0; i < aSegments.length; i++) {
		const aSegment = aSegments[i];
		const bSegment = bSegments[i];

		const xDistance = aSegment[1].x - aSegment[0].x;

		if (aSegment[0].y > bSegment[0].y || aSegment[1].y > bSegment[1].y) {
			aScore += xDistance;
		} else if (aSegment[0].y < bSegment[0].y || aSegment[1].y < bSegment[1].y) {
			bScore += xDistance;
		}
	}

	return {
		aScore,
		bScore,
	};
};