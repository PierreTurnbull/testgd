import { CDamage } from "@root/app/common/components/damage/damage.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CProjectile } from "@root/app/common/components/identity/projectile/projectile.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CTimers } from "@root/app/common/components/timers/timers.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TConeHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CMustBeDestroyedOnCollision } from "../components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { TProjectileSettings } from "../types/projectile.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { CRelation } from "@root/app/common/relations/components/common/relation.component";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";

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
		type:                "damage",
		shape:               "cone",
		initialCoordinates:  settings.coordinates,
		direction:           settings.direction,
		name:                "projectiles.slash.damage",
		size:                settings.size || 0,
		collisionCandidates: settings.collisionCandidates,
		isActive:            settings.isActive,
		offset:              hitboxCenterOffset,
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