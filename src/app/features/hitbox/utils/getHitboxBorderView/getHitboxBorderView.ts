import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { Graphics } from "pixi.js";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { CHitboxOffset } from "../../components/hitboxOffset/hitboxOffset.component";
import { CHitboxPoints } from "../../components/hitboxPoints/hitboxPoints.component";

/**
 * Initializes the view of a hitbox border.
 */
export const getHitboxBorderView = (
	entity: Entity,
) => {
	const hitboxComponent = entity.getComponent(CHitbox);
	const type = hitboxComponent.type;
	const coordinates = entity.getComponent(CLocation).coordinates;
	const offset = entity.getComponent(CHitboxOffset).offset;
	const points = entity.getComponent(CHitboxPoints).hitboxPoints;

	const hitboxBorderView = new Graphics();

	hitboxBorderView.poly(points);

	let color: number | null = null;

	if (type === "damage") {
		color = 0xff0000;
	} else if (type === "motion") {
		color = 0xffff00;
	}

	if (!color) {
		throw new Error(`Missing color for type "${type}".`);
	}

	hitboxBorderView
		.stroke({
			width:     2,
			color:     color,
			alignment: 0.5,
		});

	const label = `${entity.name}.border`;
	hitboxBorderView.label = label;

	hitboxBorderView.x = coordinates.x + offset.x;
	hitboxBorderView.y = coordinates.y + offset.y;

	return hitboxBorderView;
};