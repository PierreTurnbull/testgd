import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TPoint } from "@root/app/features/math/types/point.type";
import { getPolygonalChainExtremities } from "@root/app/features/math/utils/getPolygonalChainExtremities/getPolygonalChainExtremities";
import { addIntervalExtremities } from "@root/app/features/viewSortingCurve/utils/addIntervalExtremities/addIntervalExtremities";
import { addMatchingPoints } from "@root/app/features/viewSortingCurve/utils/addMatchingPoints/addMatchingPoints";
import { addSegmentIntersections } from "@root/app/features/viewSortingCurve/utils/addSegmentIntersections/addSegmentIntersections";
import { getAbsoluteSortingCurve } from "@root/app/features/viewSortingCurve/utils/getAbsoluteSortingCurve/getAbsoluteSortingCurve";
import { getScores } from "@root/app/features/viewSortingCurve/utils/getScores/getScores";

/**
 * Returns sorted entities.
 * 
 * Entities are sorted by comparing their sorting curves. A sorting curve is a polygonal chain.
 * 
 * Curves are considered fully in front or behind other curves, even though they might cross in
 * multiple points. This makes the process simpler, at the expense of making crossing objects
 * visually incoherent. It is expected that objects are configured in a coherent way with few to no
 * crossing. This will drastically reduce incoherent results from this function.
 */
export const getSortedEntities = (
	sortableViewEntities: Entity[],
) => {
	const sortedViewEntities = sortableViewEntities.sort((a, b) => {
		// Convert sorting curves values into absolute values in order to compare them with each
		// other.
		const absoluteASortingCurve = getAbsoluteSortingCurve(a);
		const absoluteBSortingCurve = getAbsoluteSortingCurve(b);

		const aExtremities = getPolygonalChainExtremities(absoluteASortingCurve);
		const bExtremities = getPolygonalChainExtremities(absoluteBSortingCurve);

		// If the curves do not overlap on the x axis, then there's no point computing their order
		// a single point intersection is not considered as an overlap.
		const curvesDontOverlap = (
			aExtremities.start.x >= bExtremities.end.x ||
			bExtremities.start.x >= aExtremities.end.x
		);
		if (curvesDontOverlap) {
			if (aExtremities.start.x >= bExtremities.end.x) {
				return aExtremities.start.y - bExtremities.end.y;
			} else if (bExtremities.start.x >= aExtremities.end.x) {
				return aExtremities.end.y - bExtremities.start.y;
			}
		}

		// Get the overlapping x interval.
		const xInterval = {
			start: aExtremities.start.x >= bExtremities.start.x ? aExtremities.start.x : bExtremities.start.x,
			end:   aExtremities.end.x <= bExtremities.end.x ? aExtremities.end.x : bExtremities.end.x,
		};

		// Get all the points in the interval.
		const checkIfPointIsInInterval = (point: TPoint) => {
			const pointIsInInterval = point.x > xInterval.start && point.x < xInterval.end;

			return pointIsInInterval;
		};
		const aPoints = absoluteASortingCurve.filter(checkIfPointIsInInterval);
		const bPoints = absoluteBSortingCurve.filter(checkIfPointIsInInterval);

		// Add points on each curve at the interval extremities.
		addIntervalExtremities(
			aPoints,
			bPoints,
			absoluteASortingCurve,
			absoluteBSortingCurve,
			xInterval,
		);

		// Add matching points so both curves have points on the same x's.
		addMatchingPoints(
			aPoints,
			bPoints,
		);

		// Add segment intersections to make comparisons easier.
		addSegmentIntersections(
			aPoints,
			bPoints,
		);

		// Get the score of aPoints and bPoints.
		const { aScore, bScore } = getScores(aPoints, bPoints);

		return aScore - bScore;
	});

	return sortedViewEntities;
};