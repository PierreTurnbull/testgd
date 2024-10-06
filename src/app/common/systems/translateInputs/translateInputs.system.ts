import { AActor } from "../../archetypes/actor/actor.archetype";
import { archetypeManager } from "../../archetypes/archetypeManager.singleton";
import { CAction } from "../../components/action/action.component";
import { CDirection } from "../../components/direction/direction.component";
import { CKeyboard } from "../../components/keyboard/keyboard.component";
import { CVelocity } from "../../components/velocity/velocity.component";
import { setAction } from "../../utils/setAction/setAction";
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
	const actorEntities = archetypeManager.getEntitiesByArchetype(AActor);

	for (const actorEntity of actorEntities) {
		const actionComponent = actorEntity.getComponent(CAction);
		const keyboardComponent = actorEntity.getComponent(CKeyboard);
		const directionComponent = actorEntity.getComponent(CDirection);
		const velocityComponent = actorEntity.getComponent(CVelocity);

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
		let onComplete: (() => void) | null = null;

		if (mustStartAttacking) {
			nextAction = "attacking";
			onComplete = () => {
				setAction(
					actorEntity,
					"standing",
					nextDirection,
				);
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
				onComplete: onComplete,
			},
		);
	}
}