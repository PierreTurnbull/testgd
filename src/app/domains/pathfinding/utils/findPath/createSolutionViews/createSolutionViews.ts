import { Entity } from "@root/app/common/entities/entity.models";
import { CVisibilityGraph } from "../../../components/visibilityGraph.component";
import { TPoint } from "@root/app/common/types/point.type";
import { Graphics } from "pixi.js";
import { worldManager } from "@root/app/core/worldManager/worldManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { TSegment } from "@root/app/common/types/segment.types";

/**
 * Creates views to display the solution in the entity's visibility graph.
 */
export const createSolutionViews = (
	entity: Entity,
	solution: TPoint[] | null,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);

	visibilityGraphComponent.highlightedNodeViews?.forEach(nodeView => nodeView.destroy());
	visibilityGraphComponent.highlightedNodeViews = [];

	if (configManager.config.debug.showsVisibilityGraphBestPath && solution) {
		let nodePairs: TSegment[] | null = null;

		if (solution) {
			nodePairs = [];

			for (let i = 0; i < solution.length; i++) {
				const point = solution[i];

				if (solution[i + 1]) {
					nodePairs.push([point, solution[i + 1]]);
				}
			}

			for (let i = 0; i < solution.length; i++) {
				const point = solution[i];

				const nodeView = new Graphics();
		
				nodeView.circle(point.x, point.y, 5);
			
				nodeView.fill(0x00ff00);

				visibilityGraphComponent.highlightedNodeViews.push(nodeView);
				worldManager.world.addChild(nodeView);
			}

			for (let i = 0; i < nodePairs.length; i++) {
				const nodePair = nodePairs[i];

				const nodeLinkView = new Graphics();

				nodeLinkView.moveTo(nodePair[0].x, nodePair[0].y);
				nodeLinkView.lineTo(nodePair[1].x, nodePair[1].y);
				nodeLinkView
					.stroke({
						width:     4,
						color:     0x00ff00,
						alignment: 0.5,
					});

				visibilityGraphComponent.highlightedNodeViews.push(nodeLinkView);
				worldManager.world.addChild(nodeLinkView);
			}
		}
	}
};