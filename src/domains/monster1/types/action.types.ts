import { RollingAction } from "../actions/rolling/rolling.actions";
import { StandingAction } from "../actions/standing/standing.actions";

export type TMonster1Action = StandingAction | RollingAction

export type TMonster1ActionKey = TMonster1Action["key"]