import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxOffset } from "@root/app/domains/hitbox/components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { initHitboxBorderView } from "../initHitboxBorderView/initHitboxBorderView";

/**
 * Frees the previous hitbox border view and sets the new one.
 */
export const replaceHitboxBorderView = (
	hitboxEntity: Entity,
	coordinates: TCoordinates,
	bounds: TPoint[],
) => {
	const hitboxComponent = hitboxEntity.getComponent(CHitbox);
	const hitboxOffsetComponent = hitboxEntity.getComponent(CHitboxOffset);
	const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);

	const prevHitboxBorderView = hitboxViewComponent.hitboxBorderView;

	hitboxViewComponent.hitboxBorderView = initHitboxBorderView(hitboxComponent.name, hitboxComponent.type, coordinates, hitboxOffsetComponent.offset, bounds);

	prevHitboxBorderView.removeFromParent();
};