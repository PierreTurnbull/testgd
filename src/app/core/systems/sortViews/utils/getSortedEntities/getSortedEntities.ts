import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { TOffset } from "@root/app/common/types/offset.types";
import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CViewSortingCurve } from "@root/app/domains/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveOffset } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";
import { getAllSegmentsFromCurve } from "../getAllSegmentsFromCurve/getAllSegmentsFromCurve";

/**
 * Returns sorted entities.
 */
export const getSortedEntities = (
	sortableViewEntities: Entity[],
) => {
	const sortedViewEntities = sortableViewEntities.sort((a, b) => {
		const aCoordinates = a.getComponent(CLocation).coordinates;
		const aView = a.getComponent(CView).view;
		const aViewSortingCurve = a.getComponent(CViewSortingCurve).viewSortingCurve;
		const aViewSortingCurveOffset = a.getComponent(CViewSortingCurveOffset).viewSortingCurveOffset;

		const aOffset = ENTITIES_CENTER_OFFSETS[aView.label];
		if (!aOffset) {
			throw new Error(`Missing offset for entity "${aView.label}".`);
		}

		const bCoordinates = b.getComponent(CLocation).coordinates;
		const bViewSortingCurve = b.getComponent(CViewSortingCurve).viewSortingCurve;
		const bViewSortingCurveOffset = b.getComponent(CViewSortingCurveOffset).viewSortingCurveOffset;

		// the x coordinate relative to the sorting curve
		const aXOnSortingCurve = aCoordinates.x - (bCoordinates.x + bViewSortingCurveOffset.x);

		const bCurveSegments: TSegment[] = getAllSegmentsFromCurve(bViewSortingCurve);
		const aCurveSegments: TSegment[] = getAllSegmentsFromCurve(aViewSortingCurve);

		// segment from the curve which x interval includes aPoint.x
		let segmentCandidate: TSegment | null = null;
		let aPoint: TPoint | null = null;

		for (let i = 0; i < bCurveSegments.length; i++) {
			const bSegment = bCurveSegments[i];

			for (let i = 0; i < aCurveSegments.length; i++) {
				const aSegment = aCurveSegments[i];

				// points

				const aTotalOffset: TOffset = {
					x: aViewSortingCurveOffset.x + aCoordinates.x,
					y: aViewSortingCurveOffset.y + aCoordinates.y,
				};

				const bTotalOffset: TOffset = {
					x: bViewSortingCurveOffset.x + bCoordinates.x,
					y: bViewSortingCurveOffset.y + bCoordinates.y,
				};

				const aLeftExtremity: TPoint = {
					x: aSegment[0].x + aTotalOffset.x,
					y: aSegment[0].y + aTotalOffset.y,
				};
				const aRightExtremity: TPoint = {
					x: aSegment[1].x + aTotalOffset.x,
					y: aSegment[1].y + aTotalOffset.y,
				};

				// entity a's center

				const centerIsInInterval = (
					aCoordinates.x >= bSegment[0].x + bTotalOffset.x &&
					aCoordinates.x <= bSegment[1].x + bTotalOffset.x
				);

				if (centerIsInInterval) {
					segmentCandidate = bSegment;
					aPoint = aCoordinates;
					break;
				}

				// entity a's left extremity

				const leftExtremityIsInInterval = (
					aLeftExtremity.x >= bSegment[0].x + bTotalOffset.x &&
					aLeftExtremity.x <= bSegment[1].x + bTotalOffset.x
				);

				if (leftExtremityIsInInterval) {
					segmentCandidate = bSegment;
					aPoint = {
						x: aLeftExtremity.x,
						y: aLeftExtremity.y,
					};
					break;
				}

				// entity a's right extremity

				const rightExtremityIsInInterval = (
					aRightExtremity.x >= bSegment[0].x + bTotalOffset.x &&
					aRightExtremity.x <= bSegment[1].x + bTotalOffset.x
				);

				if (rightExtremityIsInInterval) {
					segmentCandidate = bSegment;
					aPoint = {
						x: aRightExtremity.x,
						y: aRightExtremity.y,
					};
					break;
				}
			}
		}

		if (!segmentCandidate) {
			throw new Error("Missing segment candidate.");
		}
		if (!aPoint) {
			throw new Error("Missing point.");
		}

		const slope = (segmentCandidate[1].y - segmentCandidate[0].y) / (segmentCandidate[1].x - segmentCandidate[0].x);
		const yFromX = slope * (aXOnSortingCurve - segmentCandidate[0].x) + segmentCandidate[0].y + bViewSortingCurveOffset.y + bCoordinates.y;

		const aIsAboveB = aPoint.y > yFromX;

		return aIsAboveB ? 1 : -1;
	});

	return sortedViewEntities;
};