import { Entity } from "@root/app/common/entities/entity.models";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { TRelationNode } from "@root/app/common/relations/types/relation.types";
import { initHitboxBorder } from "@root/app/common/views/utils/hitboxBorder/initHitboxBorder";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { Graphics } from "pixi.js";
import { CCollisionCandidates } from "../components/collisionCandidates/collisionCandidates.component";
import { CHitbox } from "../components/hitbox/hitbox.component";
import { CHitboxIsActive } from "../components/hitboxIsActive/hitboxIsActive.component";
import { CHitboxOffset } from "../components/hitboxOffset/hitboxOffset.component";
import { CHitboxView } from "../components/hitboxView/hitboxView.component";
import { THitboxSettings } from "../types/hitbox.types";
import { getHitboxPoints } from "./getHitboxPoints";
import { CRelation } from "@root/app/common/relations/components/common/relation.component";
import { getHitboxBody } from "./getHitboxBody";

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

	if (configManager.config.debug.showsEntityHitbox) {
		hitboxBorder = initHitboxBorder(settings.name, settings.type, settings.initialCoordinates, settings.offset, hitboxPoints);
	}

	const hitboxEntity = createEntity(
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
	const relationComponent = relation.getComponent(CRelation);
	let relationNode: TRelationNode<"many"> | TRelationNode<"one">;
	if (relationComponent.relation.a.key === "hitboxes") {
		relationNode = relationComponent.relation.a;
	} else {
		relationNode = relationComponent.relation.b;
	}
	const isMany = (relationNode: TRelationNode<"many"> | TRelationNode<"one">): relationNode is TRelationNode<"many"> => {
		return typeof (relationNode as TRelationNode<"many">).value === "object";
	};
	if (!isMany(relationNode)) {
		throw new Error("Invalid hitboxes relation.");
	}
	relationNode.value.push(hitboxEntity);
};