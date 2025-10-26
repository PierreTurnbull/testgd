import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVariant } from "@root/app/ecs/components/common/variant.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { assetsManager } from "@root/app/features/assets/singletons/assetsManager.singleton";
import { SCALE_FACTOR } from "@root/app/features/view/types/views.types";
import { worldManager } from "@root/app/features/world/singletons/worldManager.singleton";
import { Sprite } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../constants/views.constants";

export const getSprite = (
	entity: Entity,
) => {
	const coordinates = entity.getComponent(CLocation).coordinates;
	const direction8 = entity.getComponent(CDirection).direction8;
	const variant = entity.getComponent(CVariant).variant;

	const name = `environment.${entity.name}.${variant}.${direction8}`;

	const sprite = new Sprite(assetsManager.textures[name]);

	sprite.label = name;
	sprite.width *= SCALE_FACTOR;
	sprite.height *= SCALE_FACTOR;

	const centerOffset = ENTITIES_CENTER_OFFSETS[name];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${name}".`);
	}
	sprite.x = coordinates.x + centerOffset.x;
	sprite.y = coordinates.y + centerOffset.y;
	worldManager.world.addChild(sprite);

	return sprite;
};