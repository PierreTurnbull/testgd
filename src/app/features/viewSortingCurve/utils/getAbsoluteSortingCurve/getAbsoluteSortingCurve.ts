import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { CView } from "@root/app/features/view/components/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { CViewSortingCurve } from "../../components/viewSortingCurve/viewSortingCurve.component";

/**
 * Returns a sorting curve with absolute value instead of values relative to the entity's view.
 */
export const getAbsoluteSortingCurve = (
	entity: Entity,
) => {
	const view = entity.getComponent(CView).view;
	const coordinates = entity.getComponent(CLocation).coordinates;
	const sortingCurve = entity.getComponent(CViewSortingCurve).viewSortingCurve;
	const centerOffset = ENTITIES_CENTER_OFFSETS[view.label];

	const absoluteSortingCurve = sortingCurve.map(point => {
		return {
			x: coordinates.x + centerOffset.x + point.x,
			y: coordinates.y + centerOffset.y + point.y,
		};
	});

	return absoluteSortingCurve;
};