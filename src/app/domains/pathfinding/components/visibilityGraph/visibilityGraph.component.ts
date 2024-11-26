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
	 * A detect-collisions system use to unblock the entity if it is stuck inside a shape.
	 */
	extendedHitboxesPointsSystem: System | null = null;
	extendedHitboxPointViews:     Graphics[] = [];
	extendedHitboxViews:          Graphics[] = [];

	/**
	 * All the existing nodes before any computation.
	 */
	nodes:          TVisibilityGraphNode[] = [];
	/**
	 * Shape segments. Each pair of direct siblings in a shape form a segment.
	 */
	shapeSegments:  TSegment[] = [];
	/**
	 * For each shape, the list of its segments. Each pair of direct siblings in a shape form a segment.
	 */
	shapesSegments: TSegment[][] = [];

	/**
	 * Points available for an aStar search.
	 */
	linkedNodes:     Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	linkedNodeViews: Graphics[] = [];

	fromLinkedNodes:       Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	toLinkedNodes:         Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]> = new Map();
	fromLinkedNodeViews:   Graphics[] = [];
	toLinkedNodeViews:     Graphics[] = [];
	toAreaLinkedNodeViews: Graphics[] = [];
	fromNode:              TVisibilityGraphNode | null = null;
	toNode:                TVisibilityGraphNode | null = null;

	/**
	 * Highlighted points that represent a path.
	 */
	highlightedNodes:     TPoint[] | null = null;
	highlightedNodeViews: Graphics[] | null = null;

	get nextStep() {
		return this.highlightedNodes?.[1] ? this.highlightedNodes[1] : null;
	}
}