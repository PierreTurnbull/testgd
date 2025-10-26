import { addStartAndEndToVisibilityGraph } from "@root/app/features/pathfinding/utils/findPath/addStartAndEndToVisibilityGraph/addStartAndEndToVisibilityGraph";
import { Component } from "../../../ecs/components/models/component.models";

/**
 * An entity that keeps track of the progress of its pathfinding.
 */
export class CIsFindingPath extends Component {
	time = 0;
	isFindingPath = false;
	generatorObject: ReturnType<typeof addStartAndEndToVisibilityGraph> | null = null;
	worker:          Worker | null = null;
}