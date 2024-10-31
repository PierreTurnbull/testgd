import { Entity } from "@root/app/common/entities/entity.models";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { initHitboxBorder } from "./initHitboxBorder";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/domains/hitbox/components/hitboxOffset/hitboxOffset.component";
import { TPoint } from "@root/app/common/types/point.type";

/**
 * Frees the previous hitbox border and sets the new one.
 */
export const replaceHitboxBorder = (
	hitboxEntity: Entity,
	coordinates: TCoordinates,
	bounds: TPoint[],
) => {
	const hitboxComponent = hitboxEntity.getComponent(CHitbox);
	const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);
	const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

	const prevHitboxBorder = hitboxViewComponent.hitboxBorder;

	hitboxViewComponent.hitboxBorder = initHitboxBorder(hitboxComponent.name, hitboxComponent.type, coordinates, hitboxOffsetComponent.offset, bounds);

	prevHitboxBorder.removeFromParent();
};