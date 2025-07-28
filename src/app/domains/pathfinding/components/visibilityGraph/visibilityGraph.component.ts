import { Component } from "@root/app/common/components/component.models";
import { TPoint } from "@root/app/common/types/point.type";
import { TSegment } from "@root/app/common/types/segment.types";
import { System } from "detect-collisions";
import { Graphics } from "pixi.js";
import { TVisibilityGraphNode } from "../../types/visibilityGraph.types";

export class CVisibilityGraph extends Component {
	/**
	 * Extended hitbox points. Hitboxes are extended by the largest dimension of this entity.
	 * This enables checking for collisions with the center of the entity instead of its hitbox.
	 * As a consequence it enables creating a visibility graph using the center of the entity as starting point.
	 */
	extendedHitboxesPoints:       TPoint[][] = [];
	/**
	 * A detect-collisions system used to unblock the entity if it is stuck inside a shape.
	 */
	extendedHitboxesPointsSystem: System | null = null;
	extendedHitboxViewGroup:      Graphics[] | null = null;
	extendedHitboxPointViewGroup: Graphics[] | null = null;

	/**
	 * All the existing nodes before any computation.
	 */
	nodes:          TVisibilityGraphNode[] = [];
	nodeViewGroup:  Graphics[] | null = null;
	/**
	 * Shape segments. Each pair of direct siblings in a shape form a segment.
	 */
	shapeSegments:  TSegment[] = [];
	/**
	 * For each shape, the list of its segments. Each pair of direct siblings in a shape form a segment.
	 */
	shapesSegments: TSegment[][] = [];

	/**
	 * Pairs of points forming a path.
	 */
	linkedNodes:         Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	linkedNodeViewGroup: Graphics[] | null = null;

	fromLinkedNodes:           Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	toLinkedNodes:             Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	toAreaLinkedNodes:         Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	fromLinkedNodeViewGroup:   Graphics[] | null = null;
	toLinkedNodeViewGroup:     Graphics[] | null = null;
	toAreaLinkedNodeViewGroup: Graphics[] | null = null;

	/**
	 * Highlighted points that represent the best path.
	 */
	solution:          TPoint[] | null = null;
	solutionViewGroup: Graphics[] | null = null;

	get nextStep() {
		return this.solution?.[1] ? this.solution[1] : null;
	}
}