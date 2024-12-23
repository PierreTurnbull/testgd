import { TDirection8 } from "../common/components/direction/types/direction.types";
import { TCoordinates } from "../common/types/coordinates.types";

export type TEnvironment = {
	name:        string,
	coordinates: TCoordinates,
	variant:     number,
	direction8:  TDirection8,
}

export type TGameData = {
	environment: TEnvironment[]
}