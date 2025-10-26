import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { TDirection8 } from "../../math/types/direction.types";
import { TVariant } from "../../view/types/views.types";
import { TViewSortingCurve } from "../../viewSortingCurve/types/viewSortingCurve.types";

export type TEnvironmentConfigItem = {
	center:       TCoordinates
	hitboxPoints: TPoint[]
	sortingCurve: TViewSortingCurve
}

/**
 * The configuration that describes the editable properties of things in the game.
 */
export type TConfig = {
	//                  name           variant          direction
	environment: Record<string, Record<TVariant, Record<TDirection8, TEnvironmentConfigItem>>>
	debug:       {
		showsEntityBorders:            boolean
		showsEntityHitboxes:           boolean
		showsEntityCenters:            boolean
		showsViewSortingCurves:        boolean
		showsExtendedHitboxes:         boolean
		showsVisibilityGraphNodes:     boolean
		showsVisibilityGraphNodeLinks: boolean
		showsVisibilityGraphSolution:  boolean
		showsMouseCoordinates:         boolean
	}
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