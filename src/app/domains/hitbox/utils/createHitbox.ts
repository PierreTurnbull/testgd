import { Entity } from "@root/app/common/entities/entity.models";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { initHitboxBorderView } from "@root/app/common/views/utils/hitboxBorderView/initHitboxBorderView";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { Graphics } from "pixi.js";
import { CMotionCollisionCandidates } from "../components/motionCollisionCandidates/motionCollisionCandidates.component";
import { CHitbox } from "../components/hitbox/hitbox.component";
import { CHitboxIsActive } from "../components/hitboxIsActive/hitboxIsActive.component";
import { CHitboxOffset } from "../components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "../components/hitboxView/hitboxView.component";
import { THitboxSettings } from "../types/hitbox.types";
import { getHitboxBody } from "./getHitboxBody";
import { getHitboxPoints } from "./getHitboxPoints";
import { CDamageCollisionCandidates } from "../components/damageCollisionCandidates/damageCollisionCandidates.component";
import { CPathfindingCollisionCandidates } from "../components/pathfindingCollisionCandidates/pathfindingCollisionCandidates.component";

/**
 * Create a hitbox related to the parent entity.
 */
export const createHitbox = (
	parent: Entity,
	settings: THitboxSettings,
) => {
	const hitboxPoints = getHitboxPoints(settings);
	const hitboxBody = getHitboxBody(settings, hitboxPoints);

	let hitboxBorder: Graphics | null = null;

	if (configManager.config.debug.showsEntityHitboxes) {
		hitboxBorder = initHitboxBorderView(settings.name, settings.type, settings.initialCoordinates, settings.offset, hitboxPoints);
	}

	const hitboxEntity = entityManager.createEntity(
		"hitbox",
		[
			new CHitbox(hitboxBody, settings.type, settings.name),
			new CHitboxView(hitboxBorder),
			new CHitboxOffset(settings.offset),
			settings.motionCollisionCandidates ? new CMotionCollisionCandidates(settings.motionCollisionCandidates) : null,
			settings.damageCollisionCandidates ? new CDamageCollisionCandidates(settings.damageCollisionCandidates) : null,
			settings.pathfindingCollisionCandidates ? new CPathfindingCollisionCandidates(settings.pathfindingCollisionCandidates) : null,
			new CHitboxIsActive(settings.isActive),
		],
	);

	// register the hitbox as a child of the parent

	const relation = parent.getRelation("hitboxes");

	relationsManager.appendToRelation(relation, hitboxEntity, "hitboxes");
};