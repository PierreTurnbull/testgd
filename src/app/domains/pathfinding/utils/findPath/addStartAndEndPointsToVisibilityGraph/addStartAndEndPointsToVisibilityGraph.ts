import { CLocation } from "@root/app/common/components/location/location.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { CVisibilityGraph } from "../../../components/visibilityGraph/visibilityGraph.component";
import { TVisibilityGraphNode } from "../../../types/visibilityGraph.types";
import { getNodesKey } from "../../common/getNodesKey";
import { getPointKey } from "../../common/getPointKey";
import { getCanLinkNodes } from "../../createVisibilityGraph/createLinkedNodes/createLinkedNodes";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { getLinkedNodeView } from "../../createVisibilityGraph/createVisibilityGraphViews/createNodeLinkViews/createNodeLinkViews";
import { TPoint } from "@root/app/common/types/point.type";

/**
 * Adds nodes and node links to the entity's visibility graph corresponding to the entity's position and its destination.
 */
export const addStartAndEndPointsToVisibilityGraph = (
	entity: Entity,
	to: TCoordinates,
	/**
	 * If provided, the destination is reached upon entering the area.
	 */
	toArea?: TPoint[],
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);
	const locationComponent = entity.getComponent(CLocation);

	const fromGraphNode: TVisibilityGraphNode = {
		key:           getPointKey(locationComponent.coordinates),
		point:         locationComponent.coordinates,
		shapeSiblings: [],
		linkedNodes:   [],
		isSuccess:     false,
	};
	const toGraphNode: TVisibilityGraphNode = {
		key:           getPointKey(to),
		point:         to,
		shapeSiblings: [],
		linkedNodes:   [],
		isSuccess:     true,
	};
	const toAreaGraphNodes: TVisibilityGraphNode[] | null = toArea
		? toArea.map(point => {
			return {
				key:           getPointKey(point),
				point:         point,
				shapeSiblings: [],
				linkedNodes:   [],
				isSuccess:     true,
			};
		})
		: null;

	visibilityGraphComponent.fromLinkedNodes.clear();
	visibilityGraphComponent.fromLinkedNodeViews.forEach(fromNodeLinkView => fromNodeLinkView.destroy());
	visibilityGraphComponent.fromLinkedNodeViews = [];

	visibilityGraphComponent.toLinkedNodes.clear();
	visibilityGraphComponent.toLinkedNodeViews.forEach(toNodeLinkView => toNodeLinkView.destroy());
	visibilityGraphComponent.toLinkedNodeViews = [];

	visibilityGraphComponent.toAreaLinkedNodeViews.forEach(toNodeLinkView => toNodeLinkView.destroy());
	visibilityGraphComponent.toAreaLinkedNodeViews = [];

	const fromLinkedNodes = new Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]>();
	const toLinkedNodes = new Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]>();
	const toAreaLinkedNodes = new Map<string, [TVisibilityGraphNode, TVisibilityGraphNode]>();

	const nodesWithEntity = structuredClone(visibilityGraphComponent.nodes);

	nodesWithEntity.forEach(nodeB => {
		const canLinkFromNode = getCanLinkNodes(fromGraphNode, nodeB, visibilityGraphComponent, { someNodeIsOnTheSegment: false });
		const canLinkToNode = getCanLinkNodes(toGraphNode, nodeB, visibilityGraphComponent, { someNodeIsOnTheSegment: false });

		if (canLinkFromNode) {
			const key = getNodesKey(fromGraphNode, nodeB);

			const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [fromGraphNode, nodeB];
			fromLinkedNodes.set(key, nodesLink);
			fromGraphNode.linkedNodes.push(nodeB);
			nodeB.linkedNodes.push(fromGraphNode);
		}
		if (canLinkToNode) {
			const key = getNodesKey(toGraphNode, nodeB);

			const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toGraphNode, nodeB];
			toLinkedNodes.set(key, nodesLink);
			toGraphNode.linkedNodes.push(nodeB);
			nodeB.linkedNodes.push(toGraphNode);
		}

		toAreaGraphNodes?.forEach(toAreaGraphNode => {
			const canLinkToAreaNode = getCanLinkNodes(toAreaGraphNode, nodeB, visibilityGraphComponent, { someNodeIsOnTheSegment: false });

			if (canLinkToAreaNode) {
				const key = getNodesKey(toAreaGraphNode, nodeB);

				const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toAreaGraphNode, nodeB];
				toAreaLinkedNodes.set(key, nodesLink);
				toAreaGraphNode.linkedNodes.push(nodeB);
				nodeB.linkedNodes.push(toAreaGraphNode);
			}
		});
	});

	const canLinkFromAndToNode = getCanLinkNodes(fromGraphNode, toGraphNode, visibilityGraphComponent, { someNodeIsOnTheSegment: false });

	if (canLinkFromAndToNode) {
		const key = getNodesKey(fromGraphNode, toGraphNode);

		const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [fromGraphNode, toGraphNode];
		fromLinkedNodes.set(key, nodesLink);
		fromGraphNode.linkedNodes.push(toGraphNode);
		toGraphNode.linkedNodes.push(fromGraphNode);
	}

	toAreaGraphNodes?.forEach(toAreaGraphNode => {
		const canLinkFromNode = getCanLinkNodes(toAreaGraphNode, fromGraphNode, visibilityGraphComponent, { someNodeIsOnTheSegment: false });
		const canLinkToNode = getCanLinkNodes(toAreaGraphNode, toGraphNode, visibilityGraphComponent, { someNodeIsOnTheSegment: false });

		if (canLinkFromNode) {
			const key = getNodesKey(toAreaGraphNode, fromGraphNode);

			const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toAreaGraphNode, fromGraphNode];
			toAreaLinkedNodes.set(key, nodesLink);
			toAreaGraphNode.linkedNodes.push(fromGraphNode);
			fromGraphNode.linkedNodes.push(toAreaGraphNode);
		}
		if (canLinkToNode) {
			const key = getNodesKey(toAreaGraphNode, toGraphNode);

			const nodesLink: [TVisibilityGraphNode, TVisibilityGraphNode] = [toAreaGraphNode, toGraphNode];
			toAreaLinkedNodes.set(key, nodesLink);
			toAreaGraphNode.linkedNodes.push(toGraphNode);
			toGraphNode.linkedNodes.push(toAreaGraphNode);
		}
	});

	if (configManager.config.debug.showsVisibilityGraphNodeLinks) {
		fromLinkedNodes.forEach(nodePair => {
			const nodeLinkView = getLinkedNodeView(nodePair, 0xff00ff);
			worldManager.world.addChild(nodeLinkView);
			visibilityGraphComponent.fromLinkedNodeViews.push(nodeLinkView);
		});
		toLinkedNodes.forEach(nodePair => {
			const nodeLinkView = getLinkedNodeView(nodePair, 0xff00ff);
			worldManager.world.addChild(nodeLinkView);
			visibilityGraphComponent.toLinkedNodeViews.push(nodeLinkView);
		});
		toAreaLinkedNodes.forEach(nodePair => {
			const nodeLinkView = getLinkedNodeView(nodePair, 0xffaaaa);
			worldManager.world.addChild(nodeLinkView);
			visibilityGraphComponent.toAreaLinkedNodeViews.push(nodeLinkView);
		});
	}

	visibilityGraphComponent.fromLinkedNodes = fromLinkedNodes;
	visibilityGraphComponent.toLinkedNodes = toLinkedNodes;

	visibilityGraphComponent.fromNode = fromGraphNode;
	visibilityGraphComponent.toNode = toGraphNode;
};