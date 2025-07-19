import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";
import { getSegmentsFromPolygonalChain } from "@root/app/common/utils/geometry/getSegmentsFromPolygonalChain/getSegmentsFromPolygonalChain";
import { getYOnSegment } from "@root/app/common/utils/geometry/getYOnSegment/getYOnSegment";
import { TViewSortingCurve } from "../../types/viewSortingCurve.types";

/**
 * Add the points of the sorting curves that are on the x of the interval's start and end.
 * 
 * If the point corresponding to the start or end of the interval do not intersect with a
 * point of a sorting curve, then there is a segment which is partially contained by the
 * interval and which needs to be taken into account when computing the view order.
 * 
 * To do so, the point of this partial segment that is on the x of the start or end of the interval
 * is added to the list of points.
 * 
 * E.g. with 2 curves made of 2 segments each, points being represented by numbers:
 * ```
 * S1: 1---2---3
 * S2:   4---5---6
 * ```
 * The interval ranges from 4 to 3.
 * 
 * A point `a` is created for `S1`, and a point `b` is created for `S2`:
 * ```
 * S1: 1-a-2---3
 * S2:   4---5-b-6
 * ```
 * This way, both curves include a sub-curve that spans the entire interval.
 */
export const addIntervalExtremities = (
	aPoints: TPoint[],
	bPoints: TPoint[],
	absoluteASortingCurve: TViewSortingCurve,
	absoluteBSortingCurve: TViewSortingCurve,
	xInterval: { start: number, end: number, },
) => {
	const aSegments = getSegmentsFromPolygonalChain(absoluteASortingCurve);
	const bSegments = getSegmentsFromPolygonalChain(absoluteBSortingCurve);
	const getSegmentIncludingX = (
		segments: TSegment[],
		x: number,
	) => {
		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];

			if (segment[0].x <= x && segment[1].x >= x) {
				return segment;
			}
		}

		throw new Error("No segment was found.");
	};
	const aSegmentsOnInterval = {
		start: getSegmentIncludingX(aSegments, xInterval.start),
		end:   getSegmentIncludingX(aSegments.slice().reverse(), xInterval.end),
	};
	const bSegmentsOnInterval = {
		start: getSegmentIncludingX(bSegments, xInterval.start),
		end:   getSegmentIncludingX(bSegments.slice().reverse(), xInterval.end),
	};
	const aExtremePoints = {
		start: { x: xInterval.start, y: getYOnSegment(aSegmentsOnInterval.start, xInterval.start) },
		end:   { x: xInterval.end, y: getYOnSegment(aSegmentsOnInterval.end, xInterval.end) },
	};
	const bExtremePoints = {
		start: { x: xInterval.start, y: getYOnSegment(bSegmentsOnInterval.start, xInterval.start) },
		end:   { x: xInterval.end, y: getYOnSegment(bSegmentsOnInterval.end, xInterval.end) },
	};

	aPoints.unshift(aExtremePoints.start);
	aPoints.push(aExtremePoints.end);
	bPoints.unshift(bExtremePoints.start);
	bPoints.push(bExtremePoints.end);
};