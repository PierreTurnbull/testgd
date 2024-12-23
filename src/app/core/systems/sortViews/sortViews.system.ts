import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { CViewSortingCurve } from "@root/app/domains/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveOffset } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";
import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { sortableViewArchetype } from "../../../common/archetypes/sortableView/sortableView.archetype";
import { configManager } from "../../configManager/configManager.singletons";
import { DEBUG_VIEW_Z_OFFSET } from "./constants/sortViews.constants";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { TSegment } from "@root/app/common/types/segment.types";
import { TPoint } from "@root/app/common/types/point.type";

/**
 * Updates the order in which views are rendered.
 * This makes items visually coherent with each other: items that are behind (with lower y coordinates)
 * appear behind items that are in front (with higher y coordinates).
 */
export const sortViews = () => {
	const sortableViewEntities = [...sortableViewArchetype.entities];

	const sortedViewEntities = sortableViewEntities.sort((a, b) => {
		const aCoordinates = a.getComponent(CLocation).coordinates;
		const aView = a.getComponent(CView).view;
		const aViewSortingCurve = a.getComponent(CViewSortingCurve).viewSortingCurve;

		const aOffset = ENTITIES_CENTER_OFFSETS[aView.label];
		if (!aOffset) {
			throw new Error(`Missing offset for entity "${aView.label}".`);
		}

		const bCoordinates = b.getComponent(CLocation).coordinates;
		const bViewSortingCurve = b.getComponent(CViewSortingCurve).viewSortingCurve;
		const bViewSortingCurveOffset = b.getComponent(CViewSortingCurveOffset).viewSortingCurveOffset;

		// the x coordinate relative to the sorting curve
		const aXOnSortingCurve = aCoordinates.x - (bCoordinates.x + bViewSortingCurveOffset.x);

		const curveSegments: TSegment[] = bViewSortingCurve
			.slice(0, -1)
			.map((point, key) => [point, bViewSortingCurve[key + 1]]);

		// segment from the curve which x interval includes aCoorddinates.x
		let segmentCandidate: TSegment | null = null;
		let aPoint: TPoint | null = null;

		for (let i = 0; i < curveSegments.length; i++) {
			const segment = curveSegments[i];

			const centerIsInInterval = (
				aCoordinates.x > segment[0].x + bViewSortingCurveOffset.x &&
				aCoordinates.x < segment[1].x + bViewSortingCurveOffset.x
			);

			if (centerIsInInterval) {
				segmentCandidate = segment;
				aPoint = aCoordinates;
				break;
			}

			const leftExtremityIsInInterval = (
				aViewSortingCurve[aViewSortingCurve.length - 1].x > segment[0].x + bViewSortingCurveOffset.x &&
				aViewSortingCurve[aViewSortingCurve.length - 1].x < segment[1].x + bViewSortingCurveOffset.x
			);

			if (leftExtremityIsInInterval) {
				segmentCandidate = segment;
				aPoint = aViewSortingCurve[1];
				break;
			}

			const rightExtremityIsInInterval = (
				aViewSortingCurve[0].x > segment[0].x + bViewSortingCurveOffset.x &&
				aViewSortingCurve[0].x < segment[1].x + bViewSortingCurveOffset.x
			);

			if (rightExtremityIsInInterval) {
				segmentCandidate = segment;
				aPoint = aViewSortingCurve[0];
				break;
			}
		}

		if (!segmentCandidate || !aPoint) return -1;

		const slope = (segmentCandidate[1].y - segmentCandidate[0].y) / (segmentCandidate[1].x - segmentCandidate[0].x);
		const yFromX = slope * (aXOnSortingCurve - segmentCandidate[0].x) + segmentCandidate[0].y + bViewSortingCurveOffset.y + bCoordinates.y;

		const aIsAboveB = aPoint.y > yFromX;

		return aIsAboveB ? 1 : -1;
	});

	sortedViewEntities.forEach((sortedViewEntity, key) => {
		sortedViewEntity.getComponent(CView).view.zIndex = key;

		if (sortedViewEntity.hasComponent(CBorderView) && configManager.config.debug.showsEntityBorders) {
			const borderViewComponent = sortedViewEntity.getComponent(CBorderView);

			borderViewComponent.borderView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
		}

		if (sortedViewEntity.hasComponent(CCenterView) && configManager.config.debug.showsEntityCenters) {
			const centerViewComponent = sortedViewEntity.getComponent(CCenterView);

			centerViewComponent.centerView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
		}

		if (sortedViewEntity.hasComponent(CViewSortingCurveView) && configManager.config.debug.showsViewSortingCurves) {
			const viewSortingCurveViewComponent = sortedViewEntity.getComponent(CViewSortingCurveView);

			if (viewSortingCurveViewComponent.viewSortingCurveView) {
				viewSortingCurveViewComponent.viewSortingCurveView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
			}
		}

		if (sortedViewEntity.relations.has("hitboxes")) {
			const hitboxEntities = sortedViewEntity.getRelatedEntities("hitboxes");

			hitboxEntities.forEach(hitboxEntity => {
				if (hitboxEntity.hasComponent(CHitboxView) && configManager.config.debug.showsEntityHitboxes) {
					const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

					hitboxViewComponent.hitboxBorderView.zIndex = DEBUG_VIEW_Z_OFFSET + key;
				}
			});
		}
	});
};