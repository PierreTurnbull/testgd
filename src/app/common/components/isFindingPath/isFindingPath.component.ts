import { addStartAndEndToVisibilityGraph } from "@root/app/domains/pathfinding/utils/findPath/addStartAndEndToVisibilityGraph/addStartAndEndToVisibilityGraph";
import { Component } from "../component.models";

/**
 * An entity that keeps track of the progress of its pathfinding.
 */
export class CIsFindingPath extends Component {
	time = 0;
	isFindingPath = false;
	generatorObject: ReturnType<typeof addStartAndEndToVisibilityGraph> | null = null;
	worker:          Worker | null = null;
}