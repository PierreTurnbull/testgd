import { TDirection8 } from "../../../common/components/direction/types/direction.types";
import { TCoordinates } from "../../../common/types/coordinates.types";

export type TEnvironmentItem = {
	gameEditorId: number
	name:         string
	coordinates:  TCoordinates
	variant:      number
	direction8:   TDirection8
}

/**
 * Game data that can be edited using the game editor.
 */
export type TGameEditorData = {
	environment: TEnvironmentItem[]
}