import { muddyBuddyArchetype } from "@root/app/common/archetypes/muddyBuddy/muddyBuddy.archetype";
import { TProjectileSettings } from "@root/app/domains/projectile/types/projectile.types";
import { createProjectile } from "@root/app/domains/projectile/utils/createProjectile";
import { AnimatedSprite } from "pixi.js";
import { AActor } from "../../../common/archetypes/actor/actor.archetype";
import { archetypeManager } from "../../../common/archetypes/archetypeManager.singleton";
import { CAction } from "../../../common/components/action/action.component";
import { CDirection } from "../../../common/components/direction/direction.component";
import { CKeyboard } from "../../../common/components/keyboard/keyboard.component";
import { CLocation } from "../../../common/components/location/location.component";
import { CVelocity } from "../../../common/components/velocity/velocity.component";
import { setAction } from "../../../common/utils/setAction/setAction";
import { getRequestedDirection } from "./utils/getRequestedDirection";
import { PROJECTILE_DEFAULT_SETTINGS } from "@root/app/domains/projectile/constants/projectile.constants";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxIsActive } from "@root/app/domains/hitbox/components/hitboxIsActive/hitboxIsActive.component";

const getAttackingIsAllowed = (currentAction: CAction["currentAction"]) => {
	const attackingIsAllowed = (
		currentAction === "running" ||
		currentAction === "rolling" ||
		currentAction === "standing"
	);

	return attackingIsAllowed;
};

const getRunningIsAllowed = (
	currentAction: CAction["currentAction"],
	requestedDirection: CDirection["direction"],
	currentDirection: CDirection["direction"],
) => {
	const requestsSameDirectionAsPreviously = requestedDirection === currentDirection;

	const runningIsAllowed = (
		currentAction === "standing" ||
		(currentAction === "rolling" && !requestsSameDirectionAsPreviously) ||
		(currentAction === "running" && !requestsSameDirectionAsPreviously)
	);

	return runningIsAllowed;
};

const getRollingIsAllowed = (
	currentAction: CAction["currentAction"],
	requestedDirection: CDirection["direction"],
	currentDirection: CDirection["direction"],
) => {
	const requestsSameDirectionAsPreviously = requestedDirection === currentDirection;

	const rollingIsAllowed = (
		currentAction === "standing" ||
		(currentAction === "running" && !requestsSameDirectionAsPreviously) ||
		(currentAction === "rolling" && !requestsSameDirectionAsPreviously)
	);

	return rollingIsAllowed;
};

const getStandingIsAllowed = (currentAction: CAction["currentAction"]) => {
	const standingIsAllowed = (
		currentAction === "running" ||
		currentAction === "rolling"
	);

	return standingIsAllowed;
};

/**
 * Translates inputs into actions.
 */
export function translateInputs() {
	const actorEntities = archetypeManager.getEntitiesByArchetype(AActor);

	for (const actorEntity of actorEntities) {
		const actionComponent = actorEntity.getComponent(CAction);
		const keyboardComponent = actorEntity.getComponent(CKeyboard);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);
		const locationComponent = actorEntity.getComponent(CLocation);

		const currentAction = actionComponent.currentAction;

		if (currentAction === "dying" || currentAction === "dead") {
			continue;
		}

		const requestedDirection = getRequestedDirection(keyboardComponent.keyboard);
		const nextDirection = requestedDirection || directionComponent.direction;

		const requestsAttacking = actionComponent.availableActions.includes("attacking") && Boolean(keyboardComponent.keyboard.Comma);
		const requestsRunning = actionComponent.availableActions.includes("running") && requestedDirection !== null;
		const requestsRolling = actionComponent.availableActions.includes("rolling") && requestedDirection !== null;
		const requestsStanding = actionComponent.availableActions.includes("standing") && (!requestsRunning && !requestsRolling) && !requestsAttacking;

		const attackingIsAllowed = getAttackingIsAllowed(actionComponent.currentAction);
		const runningIsAllowed = getRunningIsAllowed(actionComponent.currentAction, nextDirection, directionComponent.direction);
		const rollingIsAllowed = getRollingIsAllowed(actionComponent.currentAction, nextDirection, directionComponent.direction);
		const standingIsAllowed = getStandingIsAllowed(actionComponent.currentAction);

		const mustStartAttacking = requestsAttacking && attackingIsAllowed;
		const mustStartRunning = requestsRunning && runningIsAllowed;
		const mustStartRolling = requestsRolling && rollingIsAllowed;
		const mustStartStanding = requestsStanding && standingIsAllowed;

		let nextAction: CAction["currentAction"] | null = null;
		let onComplete: AnimatedSprite["onComplete"] | null = null;
		let onFrameChange: ((currentFrame: number, clear?: () => void) => void) | null = null;

		if (mustStartAttacking) {
			nextAction = "attacking";
			onComplete = () => {
				setAction(
					actorEntity,
					"standing",
					nextDirection,
				);
			};
			onFrameChange = (currentFrame: number, clear?: () => void) => {
				if (currentFrame === 2) {
					const projectileSettings: TProjectileSettings = {
						...PROJECTILE_DEFAULT_SETTINGS.slash,
						coordinates: locationComponent.coordinates,
						direction:   directionComponent.direction,
					};
					createProjectile(actorEntity, projectileSettings);
				} else if (currentFrame === 7) {
					if (clear) {
						clear();
					}
				}
			};
		} else if (mustStartRunning) {
			nextAction = "running";
		} else if (mustStartRolling) {
			nextAction = "rolling";
		} else if (mustStartStanding) {
			nextAction = "standing";
		}

		if (!nextAction) continue;

		velocityComponent.velocity = velocityComponent.actionVelocities[nextAction] || 0;

		if (actorEntity.name === "muddyBuddy") {
			const hitboxEntities = actorEntity.getRelatedEntities("hitboxes");

			const damageHitboxEntity = hitboxEntities.find(hitboxEntity => {
				const hitboxComponent = hitboxEntity.getComponent(CHitbox);

				return hitboxComponent.type === "damage";
			});

			if (!damageHitboxEntity) {
				throw new Error("Missing damage hitbox.");
			}

			const hitboxIsActiveComponent = damageHitboxEntity.getComponent(CHitboxIsActive);

			hitboxIsActiveComponent.hitboxIsActive = nextAction === "rolling";
		}

		setAction(
			actorEntity,
			nextAction,
			nextDirection,
			{
				onComplete:    onComplete,
				onFrameChange: onFrameChange,
			},
		);
	}
}