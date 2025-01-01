import { describe, expect, test } from "vitest";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { aStar } from "./aStar";
import { TVisibilityGraphNode } from "../../../types/visibilityGraph.types";

describe("aStar", async () => {
	/**
	 * A - B
	 */
	test("Direct line", () => {
		const visibilityGraphComponent = new CVisibilityGraph();

		const fromNode: TVisibilityGraphNode = {
			key:           "0,0",
			point:         { x: 0, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     false,
		};
		const toNode: TVisibilityGraphNode = {
			key:           "1,0",
			point:         { x: 1, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     true,
		};

		visibilityGraphComponent.fromNode = fromNode;
		visibilityGraphComponent.toNode = toNode;

		visibilityGraphComponent.fromNode.linkedNodes.push(toNode);
		visibilityGraphComponent.toNode.linkedNodes.push(fromNode);

		expect(aStar(visibilityGraphComponent.fromNode, visibilityGraphComponent.toNode)).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
		]);
	});

	/**
	 *   *
	 *  / \
	 * A - B
	 *  \ /
	 *   *
	 */
	test("Direct line with multiple paths possible", () => {
		const visibilityGraphComponent = new CVisibilityGraph();

		const fromNode: TVisibilityGraphNode = {
			key:           "0,0",
			point:         { x: 0, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     false,
		};
		const toNode: TVisibilityGraphNode = {
			key:           "2,0",
			point:         { x: 2, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     true,
		};
		const nodes: TVisibilityGraphNode[] = [
			{
				key:           "1,1",
				point:         { x: 1, y: 1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "1,-1",
				point:         { x: 1, y: -1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
		];

		fromNode.linkedNodes = [toNode, ...nodes];
		toNode.linkedNodes = [fromNode, ...nodes];
		nodes[0].linkedNodes = [fromNode, toNode, nodes[1]];
		nodes[1].linkedNodes = [fromNode, toNode, nodes[0]];

		visibilityGraphComponent.fromNode = fromNode;
		visibilityGraphComponent.toNode = toNode;

		expect(aStar(visibilityGraphComponent.fromNode, visibilityGraphComponent.toNode)).toEqual([
			{ x: 0, y: 0 },
			{ x: 2, y: 0 },
		]);
	});

	/**
	 * B
	 *   \
	 *     A
	 */
	test("From positive coordinates to negative coordinates", () => {
		const visibilityGraphComponent = new CVisibilityGraph();

		visibilityGraphComponent.fromNode = {
			key:           "1,2",
			point:         { x: 1, y: 2 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     false,
		};
		visibilityGraphComponent.toNode = {
			key:           "-3,-4",
			point:         { x: -3, y: -4 },
			shapeSiblings: [],
			linkedNodes:   [visibilityGraphComponent.fromNode],
			isSuccess:     true,
		};
		visibilityGraphComponent.fromNode.linkedNodes.push(visibilityGraphComponent.toNode);

		expect(aStar(visibilityGraphComponent.fromNode, visibilityGraphComponent.toNode)).toEqual([
			{ x: 1, y: 2 },
			{ x: -3, y: -4 },
		]);
	});

	/**
	 *   * - * - *
	 *   |       |
	 *   * - A   B - *
	 *  /        |   |
	 * * ------- * - *
	 */
	test("Multiple steps", () => {
		const visibilityGraphComponent = new CVisibilityGraph();

		const fromNode: TVisibilityGraphNode = {
			key:           "0,0",
			point:         { x: 0, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     false,
		};
		const toNode: TVisibilityGraphNode = {
			key:           "1,0",
			point:         { x: 1, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     true,
		};
		const nodes: TVisibilityGraphNode[] = [
			{
				key:           "-1,0",
				point:         { x: -1, y: 0 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "-1,-1",
				point:         { x: -1, y: -1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "0,-1",
				point:         { x: 0, y: -1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "1,-1",
				point:         { x: 1, y: -1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "2,1",
				point:         { x: 2, y: 1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "1,1",
				point:         { x: 1, y: 1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "2,1",
				point:         { x: 2, y: 1 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
			{
				key:           "2,0",
				point:         { x: 2, y: 0 },
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     false,
			},
		];

		fromNode.linkedNodes = [nodes[0]];
		toNode.linkedNodes = [nodes[3], nodes[5], nodes[7]];
		nodes[0].linkedNodes = [fromNode, nodes[1], nodes[4]];
		nodes[1].linkedNodes = [nodes[0], nodes[2]];
		nodes[2].linkedNodes = [nodes[1], nodes[3]];
		nodes[3].linkedNodes = [nodes[2], toNode];
		nodes[4].linkedNodes = [nodes[0], nodes[5]];
		nodes[5].linkedNodes = [nodes[4], toNode, nodes[6]];
		nodes[6].linkedNodes = [nodes[5], nodes[7]];
		nodes[7].linkedNodes = [nodes[6], toNode];

		visibilityGraphComponent.fromNode = fromNode;
		visibilityGraphComponent.toNode = toNode;

		expect(aStar(visibilityGraphComponent.fromNode, visibilityGraphComponent.toNode)).toEqual([
			{ x: 0, y: 0 },
			{ x: -1, y: 0 },
			{ x: -1, y: -1 },
			{ x: 0, y: -1 },
			{ x: 1, y: -1 },
			{ x: 1, y: 0 },
		]);
	});

	/**
	 * A   B
	 */
	test("No path", () => {
		const visibilityGraphComponent = new CVisibilityGraph();

		visibilityGraphComponent.fromNode = {
			key:           "0,0",
			point:         { x: 0, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     false,
		};
		visibilityGraphComponent.toNode = {
			key:           "1,0",
			point:         { x: 1, y: 0 },
			shapeSiblings: [],
			linkedNodes:   [],
			isSuccess:     true,
		};

		expect(aStar(visibilityGraphComponent.fromNode, visibilityGraphComponent.toNode)).toEqual(null);
	});
});