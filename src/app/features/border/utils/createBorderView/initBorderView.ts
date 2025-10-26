import { CLocation } from "@root/app/ecs/components/common/location.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { CBorderView } from "@root/app/features/view/components/borderView.component";
import { CView } from "@root/app/features/view/components/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { worldManager } from "@root/app/features/world/singletons/worldManager.singleton";
import { Graphics } from "pixi.js";

export const createBorderView = (
	entity: Entity,
) => {
	const borderViewComponent = entity.getComponent(CBorderView);
	const view = entity.getComponent(CView).view;
	const coordinates = entity.getComponent(CLocation).coordinates;

	const borderView = new Graphics()
		.rect(0, 0, view.width, view.height)
		.stroke({
			width:     2,
			color:     0xaaaaaa,
			alignment: 0.5,
		});
	const label = `${view.label}.border`;
	borderView.label = label;

	const centerOffset = ENTITIES_CENTER_OFFSETS[label];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${view.label}".`);
	}
	borderView.x = coordinates.x + centerOffset.x;
	borderView.y = coordinates.y + centerOffset.y;

	worldManager.world.addChild(borderView);

	borderViewComponent.borderView = borderView;
};