import { AttackingAction } from "@root/actions/player/attacking/attacking.action"
import { RunningAction } from "@root/actions/player/running/running.action"
import { StandingAction } from "@root/actions/player/standing/standing.action"

export type TPlayerAction = StandingAction | RunningAction | AttackingAction

export type TPlayerActionKey = TPlayerAction["key"]