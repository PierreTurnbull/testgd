import { appManager } from "@root/app/domains/app/appManager.singleton";
import { createRockLG } from "@root/app/domains/rockLG/utils/createRockLG";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app.constants";
import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CLocation } from "@root/app/common/components/location/location.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { APathfinder } from "@root/app/common/archetypes/pathfinder/pathfinder.archetype";
import { createVisibilityGraph } from "@root/app/domains/pathfinding/utils/createVisibilityGraph/createVisibilityGraph";

export class GameEditor {
	constructor() {
		const playerEntity = [...playerArchetype.entities][0];
		const playerLocationComponent = playerEntity.getComponent(CLocation);

		this.playerLocationComponent = playerLocationComponent;
		this.mouseCoordinates = this.getMouseCoordinates();

		window.addEventListener("mousemove", this.captureMouseMotion.bind(this));
		window.addEventListener("keydown", this.gameEditorEvent.bind(this));
	}

	getMouseCoordinates () {
		const x = appManager.app.renderer.events.pointer.x;
		const y = appManager.app.renderer.events.pointer.y;

		const offsetX = Math.round(x - CANVAS_WIDTH / 2 + this.playerLocationComponent.coordinates.x);
		const offsetY = Math.round(y - CANVAS_HEIGHT / 2 + this.playerLocationComponent.coordinates.y);

		return {
			x: offsetX,
			y: offsetY,
		};
	};

	captureMouseMotion () {
		this.mouseCoordinates = this.getMouseCoordinates();
	};

	gameEditorEvent (event: KeyboardEvent) {
		// key for # and @
		if (event.code === "IntlBackslash") {
			createRockLG(this.mouseCoordinates, 0, "up");

			const pathfinders = [...archetypeManager.getArchetype(APathfinder).entities];
	
			for (let i = 0; i < pathfinders.length; i++) {
				const pathfinder = pathfinders[i];
	
				createVisibilityGraph(pathfinder);
			}
		}
	};

	playerLocationComponent: CLocation;
	mouseCoordinates:        TCoordinates;
};
