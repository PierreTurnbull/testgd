import { TSegment } from "@root/app/common/types/segment.types";
import { Entity } from "@root/app/domains/entity/entity.models";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { Graphics } from "pixi.js";

/**
 * Creates views to display the solution in the entity's visibility graph.
 */
export const getSolutionView = (
	entity: Entity,
) => {
	const visibilityGraphComponent = entity.getComponent(CVisibilityGraph);
	const solution = visibilityGraphComponent.solution;

	const solutionViewGroup = [];

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

			solutionViewGroup.push(nodeView);
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

			solutionViewGroup.push(nodeLinkView);
		}
	}

	return solutionViewGroup;
};