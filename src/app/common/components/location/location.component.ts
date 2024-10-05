import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { Component } from "../component.models";

export class CLocation extends Component {
	coordinates: TCoordinates = {
		x: 0,
		y: 0,
	};
}
