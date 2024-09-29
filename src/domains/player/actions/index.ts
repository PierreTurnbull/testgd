import { AttackingAction } from "./attacking/attacking.actions";
import { RunningAction } from "./running/running.actions";
import { StandingAction } from "./standing/standing.actions";

export const playerActions = {
	Standing: StandingAction,
	Running: RunningAction,
	Attacking: AttackingAction,
};