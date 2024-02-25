import { AttackingAction } from "./attacking/attacking.action"
import { RunningAction } from "./running/running.action"
import { StandingAction } from "./standing/standing.action"

export const playerActions = {
	Standing: StandingAction,
	Running: RunningAction,
	Attacking: AttackingAction,
}