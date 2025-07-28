import { CLocation } from "@root/app/common/components/location/location.component";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { Entity } from "@root/app/domains/entity/entity.models";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { relationsManager } from "@root/app/domains/relationManager/relationsManager.singleton";
import { createView } from "../../view/utils/create/createView/createView";
import { CDamageCollisionCandidates } from "../components/damageCollisionCandidates/damageCollisionCandidates.component";
import { CHitbox } from "../components/hitbox/hitbox.component";
import { CHitboxIsActive } from "../components/hitboxIsActive/hitboxIsActive.component";
import { CHitboxOffset } from "../components/hitboxOffset/hitboxOffset.component";
import { CHitboxPoints } from "../components/hitboxPoints/hitboxPoints.component";
import { CHitboxView } from "../components/hitboxView/hitboxView.component";
import { CMotionCollisionCandidates } from "../components/motionCollisionCandidates/motionCollisionCandidates.component";
import { CPathfindingCollisionCandidates } from "../components/pathfindingCollisionCandidates/pathfindingCollisionCandidates.component";
import { THitboxSettings } from "../types/hitbox.types";
import { getHitboxBody } from "./getHitboxBody";
import { getHitboxBorderView } from "./getHitboxBorderView/getHitboxBorderView";
import { getHitboxPoints } from "./getHitboxPoints";

/**
 * Create a hitbox related to the parent entity.
 */
export const createHitbox = (
	parent: Entity,
	settings: THitboxSettings,
) => {
	const hitboxPoints = getHitboxPoints(settings);
	const hitboxBody = getHitboxBody(settings, hitboxPoints);

	const hitboxEntity = entityManager.createEntity(
		`hitbox.${settings.name}`,
		[
			new CHitboxPoints(hitboxPoints),
			new CHitbox(hitboxBody, settings.type, settings.name),
			new CHitboxView(null),
			new CLocation(settings.initialCoordinates),
			new CHitboxOffset(settings.offset),
			settings.motionCollisionCandidates ? new CMotionCollisionCandidates(settings.motionCollisionCandidates) : null,
			settings.damageCollisionCandidates ? new CDamageCollisionCandidates(settings.damageCollisionCandidates) : null,
			settings.pathfindingCollisionCandidates ? new CPathfindingCollisionCandidates(settings.pathfindingCollisionCandidates) : null,
			new CHitboxIsActive(settings.isActive),
		],
	);

	if (configManager.config.debug.showsEntityHitboxes) {
		createView(hitboxEntity, CHitboxView, getHitboxBorderView, "hitboxBorderView");
	}

	// register the hitbox as a child of the parent

	const relation = parent.getRelation("hitboxes");

	relationsManager.appendToRelation(relation, hitboxEntity, "hitboxes");
};