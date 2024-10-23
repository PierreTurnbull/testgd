import { muddyBuddyArchetype } from "@root/app/common/archetypes/muddyBuddy/muddyBuddy.archetype";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CProjectile } from "@root/app/common/components/identity/projectile/projectile.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CTimers } from "@root/app/common/components/timers/timers.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { getAngleInterval } from "@root/app/common/utils/getAngleInterval/getAngleInterval";
import { getCirclePoint } from "@root/app/common/utils/getCirclePoint/getCirclePoint";
import { initHitboxBorder } from "@root/app/common/views/utils/hitboxBorder/initHitboxBorder";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { Polygon } from "detect-collisions";
import { Graphics } from "pixi.js";
import { CCollisionCandidates } from "../common/collisionCandidates/collisionCandidates.component";
import { TProjectileSettings } from "../types/projectile.types";
import { CDamage } from "@root/app/common/components/damage/damage.component";

export const createProjectile = (
	parent: Entity,
	settings: TProjectileSettings,
) => {
	const circleOrigin: TCoordinates = {
		x: 0,
		y: 0, 
	};
	const angleRange = 70;
	const angleInterval = getAngleInterval(settings.direction, angleRange);
	const intervalsCount = 4;
	const partialAngleRange = angleRange / intervalsCount;
	const circlePoints = Array(intervalsCount + 1).fill(null)
		.map((_, key: number) => getCirclePoint(circleOrigin, settings.size || 0, angleInterval[0] + partialAngleRange * key));
	const hitboxPoints: TPoint[] = [
		{
			x: 0,
			y: 0,
		},
		...circlePoints,
	];
	const hitboxBody: Polygon = collisionsManager.system.createPolygon(
		settings.coordinates,
		hitboxPoints,
		{
			isTrigger: true,
		},
	);

	let hitboxBorder: Graphics | null = null;

	if (configManager.config.debug.showsEntityHitbox) {
		hitboxBorder = initHitboxBorder("projectiles.sword", hitboxPoints, settings.coordinates);
	}

	const createdEntity = createEntity(
		"projectile",
		[
			// identity
			new CProjectile(),

			// misc
			new CDirection(),
			new CLocation(settings.coordinates),
			new CVelocity({}, settings.velocity || 0),
			new CCollisionCandidates([muddyBuddyArchetype]),
			new CHitbox(hitboxBody, "characters.projectile.hitboxBorder"),
			settings.damage ? new CDamage(settings.damage || 0) : null,

			// views
			new CHitboxView(hitboxBorder),
		],
	);

	relationsManager.createRelation({
		a: {
			key:   "shooter",
			value: parent, 
		},
		b: {
			key:   "projectile",
			value: createdEntity, 
		},
	});

	if (settings.lifeDuration) {
		const timersComponent = createdEntity.getComponent(CTimers);
		const id = setTimeout(() => {
			createdEntity.destroy();
		}, settings.lifeDuration);
		timersComponent.setTimer(id);
	}
};