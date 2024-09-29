import { AttackingAction } from "../actions/attacking/attacking.actions";
import { RunningAction } from "../actions/running/running.actions";
import { StandingAction } from "../actions/standing/standing.actions";

export type TPlayerAction = StandingAction | RunningAction | AttackingAction

export type TPlayerActionKey = TPlayerAction["key"]