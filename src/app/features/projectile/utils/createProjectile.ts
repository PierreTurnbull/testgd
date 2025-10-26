import { CDamage } from "@root/app/ecs/components/common/damage.component";
import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CTimers } from "@root/app/ecs/components/common/timers.component";
import { CVelocity } from "@root/app/ecs/components/common/velocity.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { CRelation } from "@root/app/features/relation/components/common/relation.component";
import { relationsManager } from "@root/app/features/relation/relationsManager.singleton";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { TConeHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CMustBeDestroyedOnCollision } from "../components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { CProjectile } from "../components/projectile/projectile.component";
import { TProjectileSettings } from "../types/projectile.types";

export const createProjectile = (
	parent: Entity,
	settings: TProjectileSettings,
) => {
	const projectileEntity = entityManager.createEntity(
		"projectile",
		[
			// identity
			new CProjectile(settings.type),

			// misc
			new CDirection(settings.direction),
			new CLocation(settings.coordinates),
			new CVelocity({}, settings.velocity || 0),
			settings.damage ? new CDamage(settings.damage || 0) : null,
			new CMustBeDestroyedOnCollision(settings.mustBeDestroyedOnCollision),
		],
	);

	if (parent.relations.has("projectiles")) {
		const projectilesRelation = parent.getRelation("projectiles");
		const relationComponent = projectilesRelation.getComponent(CRelation);

		(relationComponent.relation.b.value as Entity[]).push(projectileEntity);
		projectileEntity.relations.set("shooter", parent.getRelation("projectiles"));
	} else {
		relationsManager.createRelation({
			a: {
				key:   "shooter",
				value: parent, 
			},
			b: {
				key:   "projectiles",
				value: [projectileEntity], 
			},
			mustCascadeDelete: false,
		});
	}

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: projectileEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [],
		},
		mustCascadeDelete: true,
	});

	const hitboxCenterOffset = ENTITIES_CENTER_OFFSETS[`projectiles.${settings.type}.damage.hitboxBorder`];
	if (!hitboxCenterOffset) {
		throw new Error("Missing center offset for player.");
	}

	const hitboxSettings: TConeHitboxSettings = {
		type:                      "damage",
		shape:                     "cone",
		initialCoordinates:        settings.coordinates,
		direction:                 settings.direction,
		name:                      "projectiles.slash.damage",
		size:                      settings.size || 0,
		damageCollisionCandidates: settings.damageCollisionCandidates,
		isActive:                  settings.isActive,
		offset:                    hitboxCenterOffset,
	};

	createHitbox(
		projectileEntity,
		hitboxSettings,
	);

	if (settings.lifeDuration) {
		const timersComponent = projectileEntity.getComponent(CTimers);
		const id = setTimeout(() => {
			projectileEntity.destroy();
		}, settings.lifeDuration);
		timersComponent.addTimer(id);
	}
};