import { StandingAction } from "@root/actions/monster1/standing/standing.action"
import { RollingAction } from "@root/actions/monster1/rolling/rolling.action"

export type TMonster1Action = StandingAction | RollingAction

export type TMonster1ActionKey = TMonster1Action["key"]