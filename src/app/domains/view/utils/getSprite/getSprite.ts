import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { Entity } from "@root/app/domains/entity/entity.models";
import { worldManager } from "@root/app/domains/worldManager/worldManager.singletons";
import { Sprite } from "pixi.js";
import { ENTITIES_CENTER_OFFSETS } from "../../../../common/constants/views.constants";

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