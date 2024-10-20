import { setHitboxBorder } from "@root/app/common/animatedSprites/utils/hitboxBorder/setHitboxBorder";
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
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { Polygon } from "detect-collisions";
import { CCollisionCandidates } from "../common/collisionCandidates/collisionCandidates.component";
import { TProjectileSettings } from "../types/projectile.types";

export const createProjectile = (
	parent: Entity,
	settings: TProjectileSettings,
) => {
	const projectileComponent = new CProjectile();
	const directionComponent = new CDirection();
	const locationComponent = new CLocation();
	const velocityComponent = new CVelocity();
	const hitboxViewComponent = new CHitboxView();
	const timersComponent = new CTimers();
	const collisionCandidates = new CCollisionCandidates([muddyBuddyArchetype]);

	directionComponent.direction = settings.direction;

	locationComponent.coordinates = settings.coordinates;

	velocityComponent.velocity = settings.velocity || 0;

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

	if (configManager.config.debug.showsEntityHitbox) {
		setHitboxBorder(hitboxViewComponent, "projectiles.sword", hitboxPoints, settings.coordinates);
	}

	const hitboxComponent = new CHitbox(hitboxBody, "characters.projectile.hitboxBorder");

	const createdEntity = createEntity(
		"projectile",
		[
			projectileComponent,
			directionComponent,
			locationComponent,
			velocityComponent,
			hitboxComponent,
			hitboxViewComponent,
			collisionCandidates,
			timersComponent,
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
		const id = setTimeout(() => {
			createdEntity.destroy();
		}, settings.lifeDuration);
		timersComponent.timers.push(Number(id));
	}
};