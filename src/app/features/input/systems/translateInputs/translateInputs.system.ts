import { actorArchetype } from "@root/app/ecs/archetypes/common/actor.archetype";
import { CAction } from "@root/app/ecs/components/common/action.component";
import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CKeyboard } from "@root/app/ecs/components/common/keyboard.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVelocity } from "@root/app/ecs/components/common/velocity.component";
import { PROJECTILE_DEFAULT_SETTINGS } from "@root/app/features/projectile/constants/projectile.constants";
import { TProjectileSettings } from "@root/app/features/projectile/types/projectile.types";
import { createProjectile } from "@root/app/features/projectile/utils/createProjectile";
import { AnimatedSprite } from "pixi.js";
import { setAction } from "../../../action/utils/setAction/setAction";
import { getRequestedDirection } from "./utils/getRequestedDirection";

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
	const actorEntities = actorArchetype.entities;

	for (const actorEntity of actorEntities) {
		const actionComponent = actorEntity.getComponent(CAction);
		const keyboardComponent = actorEntity.getComponent(CKeyboard);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);
		const locationComponent = actorEntity.getComponent(CLocation);

		const currentAction = actionComponent.currentAction;

		if (currentAction === "dying" || currentAction === "beingDead") {
			continue;
		}

		const requestedDirection = getRequestedDirection(keyboardComponent.keyboard, keyboardComponent.joystickAngle);
		const nextDirection = requestedDirection !== null ? requestedDirection : directionComponent.direction;

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