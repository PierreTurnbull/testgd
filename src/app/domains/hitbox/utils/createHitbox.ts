import { Entity } from "@root/app/common/entities/entity.models";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { initHitboxBorder } from "@root/app/common/views/utils/hitboxBorder/initHitboxBorder";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { Graphics } from "pixi.js";
import { CCollisionCandidates } from "../components/collisionCandidates/collisionCandidates.component";
import { CHitbox } from "../components/hitbox/hitbox.component";
import { CHitboxIsActive } from "../components/hitboxIsActive/hitboxIsActive.component";
import { CHitboxOffset } from "../components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "../components/hitboxView/hitboxView.component";
import { THitboxSettings } from "../types/hitbox.types";
import { getHitboxBody } from "./getHitboxBody";
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

	let hitboxBorder: Graphics | null = null;

	if (configManager.config.debug.showsEntityHitboxes) {
		hitboxBorder = initHitboxBorder(settings.name, settings.type, settings.initialCoordinates, settings.offset, hitboxPoints);
	}

	const hitboxEntity = entityManager.createEntity(
		"hitbox",
		[
			new CHitbox(hitboxBody, settings.type, settings.name),
			new CHitboxView(hitboxBorder),
			new CHitboxOffset(settings.offset),
			new CCollisionCandidates(settings.collisionCandidates),
			new CHitboxIsActive(settings.isActive),
		],
	);

	// register the hitbox as a child of the parent

	const relation = parent.getRelation("hitboxes");

	relationsManager.appendToRelation(relation, hitboxEntity, "hitboxes");
};