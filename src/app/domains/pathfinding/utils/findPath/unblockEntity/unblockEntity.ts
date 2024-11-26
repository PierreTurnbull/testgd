import { CLocation } from "@root/app/common/components/location/location.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { applyMotion } from "@root/app/common/utils/applyMotion/applyMotion";
import { CVisibilityGraph } from "../../../components/visibilityGraph.component";

/**
 * Unblocks an entity that is stuck inside a shape.
 * Theoretically, this should never happen, but there is a slight margin of error
 * when calculating new coordinates of a moving entity, due to imprecise decimals.
 * This margin cannot be applied to the extended hitboxes by making them smaller,
 * as this would prevent the entity from reaching the points, so it would prevent
 * them from moving around a corner.
 */
export const unblockEntity = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);
	const locationComponent = entity.getComponent(CLocation);

	if (!visibilityGraphComponent.extendedHitboxesPointsSystem) {
		throw new Error(`Missing detect-collisions system to unblock entity "${entity.name}" (id: ${entity.id}).`); 
	}

	const point = visibilityGraphComponent.extendedHitboxesPointsSystem.createPoint(locationComponent.coordinates);
	visibilityGraphComponent.extendedHitboxesPointsSystem.checkOne(point, (response) => {
		const errorMargin = 0.1; // in order to avoid falling into another margin of error, add a imperceptible margin

		const xErrorMargin = response.overlapV.x < 0 ? -errorMargin : errorMargin;
		const yErrorMargin = response.overlapV.y < 0 ? -errorMargin : errorMargin;

		const nextCoordinates = {
			x: locationComponent.coordinates.x - (response.overlapV.x + xErrorMargin),
			y: locationComponent.coordinates.y - (response.overlapV.y + yErrorMargin),
		};

		applyMotion(
			entity,
			nextCoordinates,
		);

		response.clear();
	});
	visibilityGraphComponent.extendedHitboxesPointsSystem.remove(point);
};