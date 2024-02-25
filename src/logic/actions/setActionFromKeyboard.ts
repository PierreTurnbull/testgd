import { Monster1 } from "@root/entities/characters/monster1/monster1.entity"
import { Player } from "@root/entities/characters/player/player.entity"
import { TDirection } from "@root/types/action/direction.type"

const getRequestedDirection = (keyboard: Record<string, boolean>): TDirection | null => {
	let requestedDirection: TDirection | null = null

	const leftKey: boolean = keyboard.KeyA
	const rightKey: boolean = keyboard.KeyD
	const upKey: boolean = keyboard.KeyW
	const downKey: boolean = keyboard.KeyS

	// conflicting diagonals and axis
	if (upKey && downKey && leftKey && rightKey) requestedDirection = null

	// conflicting diagonals
	else if (downKey && rightKey && leftKey) requestedDirection = "down"
	else if (upKey && rightKey && leftKey) requestedDirection = "up"
	else if (leftKey && upKey && downKey) requestedDirection = "left"
	else if (rightKey && upKey && downKey) requestedDirection = "right"

	// conflicting axis
	else if (downKey && upKey) requestedDirection = null
	else if (leftKey && rightKey) requestedDirection = null

	// diagonals
	else if (upKey && leftKey && !rightKey) requestedDirection = "upLeft"
	else if (upKey && rightKey && !leftKey) requestedDirection = "upRight"
	else if (downKey && leftKey && !rightKey) requestedDirection = "downLeft"
	else if (downKey && rightKey && !leftKey) requestedDirection = "downRight"

	// axis
	else if (leftKey) requestedDirection = "left"
	else if (upKey) requestedDirection = "up"
	else if (rightKey) requestedDirection = "right"
	else if (downKey) requestedDirection = "down"

	return requestedDirection
}

export const setPlayerActionFromKeyboard = (player: Player) => {
	const requestsMovement = player.keyboard.KeyA || player.keyboard.KeyW || player.keyboard.KeyD || player.keyboard.KeyS
	const requestedDirection: TDirection | null = getRequestedDirection(player.keyboard)
	const requestsSameDirection = requestedDirection === player.direction
	const isAlreadyRunningInSameDirection = player.isRunning && requestsSameDirection

	const requestsAttacking = player.canStartAttacking && player.keyboard.Comma
	const requestsRunning = player.canStartRunning && !isAlreadyRunningInSameDirection && requestedDirection !== null
	const requestsStanding = player.canStartStanding && (!requestsMovement || requestedDirection === null)

	if (requestsAttacking) player.replaceAction("attacking", player.direction || "down")
	else if (requestsRunning) player.replaceAction("running", requestedDirection)
	else if (requestsStanding) player.replaceAction("standing", player.direction || "down")
}

export const setMonster1ActionFromKeyboard = (monster1: Monster1) => {
	const requestsMovement = monster1.keyboard.KeyA || monster1.keyboard.KeyW || monster1.keyboard.KeyD || monster1.keyboard.KeyS
	const requestedDirection: TDirection | null = getRequestedDirection(monster1.keyboard)
	const requestsSameDirection = requestedDirection === monster1.direction
	const isAlreadyRollingInSameDirection = monster1.isRolling && requestsSameDirection

	const requestsRolling = monster1.canRoll && !isAlreadyRollingInSameDirection && requestedDirection !== null

	if (requestsRolling) monster1.replaceAction("rolling", requestedDirection)
}