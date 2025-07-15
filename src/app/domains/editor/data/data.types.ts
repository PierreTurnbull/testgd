import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { TVariant } from "@root/app/common/types/variant.types";

export type TEnvironmentConfigItem = {
	center:       TCoordinates
	hitboxPoints: TPoint[]
}

/**
 * The configuration that describes the editable properties of things in the game.
 */
export type TConfig = {
	//                  name           variant          direction
	environment: Record<string, Record<TVariant, Record<TDirection8, TEnvironmentConfigItem>>>
}

export type TEnvironmentItem = {
	gameEditorId: number
	name:         string
	coordinates:  TCoordinates
	variant:      number
	direction8:   TDirection8
}

/**
 * Instances of world objects.
 */
export type TItems = {
	environment: TEnvironmentItem[]
}

/**
 * Game data that can be edited using the game editor.
 */
export type TGameEditorData = {
	config: TConfig
	items:  TItems
}