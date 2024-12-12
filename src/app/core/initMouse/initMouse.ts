import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CLocation } from "@root/app/common/components/location/location.component";
import { appManager } from "@root/app/domains/app/appManager.singleton";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app.constants";
import { CMouseCoordinates } from "@root/app/common/components/mouseCoordinates/mouseCoordinates.component";
import { Text } from "pixi.js";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { configManager } from "../configManager/configManager.singletons";
import { TCoordinates } from "@root/app/common/types/coordinates.types";

export const initMouse = () => {
	if (configManager.config.debug.showsMouseCoordinates) {
		const playerEntity = [...playerArchetype.entities][0];
		const playerLocationComponent = playerEntity.getComponent(CLocation);

		const mouseCoordinatesComponent = new CMouseCoordinates();

		mouseCoordinatesComponent.text = new Text({
			text:  "",
			style: {
				fontFamily: "Pixeled",
				fontSize:   10,
				fill:       0xFFFFFF,
			},
		});
		appManager.app.stage.addChild(mouseCoordinatesComponent.text);

		entityManager.createEntity(
			"mouseCoordinates",
			[
				mouseCoordinatesComponent,
			],
		);

		mouseCoordinatesComponent.text.x = 50;
		mouseCoordinatesComponent.text.y = 50;

		const updateMouseCoordinates = () => {
			const x = appManager.app.renderer.events.pointer.x;
			const y = appManager.app.renderer.events.pointer.y;

			const textX = Math.round(x - CANVAS_WIDTH / 2 + playerLocationComponent.coordinates.x);
			const textY = Math.round(y - CANVAS_HEIGHT / 2 + playerLocationComponent.coordinates.y);

			mouseCoordinatesComponent.text.text = `x: ${textX} y: ${textY}`;
			mouseCoordinatesComponent.text.x = x - mouseCoordinatesComponent.text.width / 2;
			mouseCoordinatesComponent.text.y = y - 30;
		};

		const getCoordinatesString = (x: number, y: number) => {
			const coordinatesString = `{ x: ${x}, y: ${y} }`;

			return coordinatesString;
		};

		const copiedCoordinates: TCoordinates[] = [];

		const copyMouseCoordinates = (event: MouseEvent) => {
			const x = Math.round(appManager.app.renderer.events.pointer.x - CANVAS_WIDTH / 2 + playerLocationComponent.coordinates.x);
			const y = Math.round(appManager.app.renderer.events.pointer.y - CANVAS_HEIGHT / 2 + playerLocationComponent.coordinates.y);

			if (event.button === 0) { 
				navigator.clipboard.writeText(getCoordinatesString(x, y));
			}

			if (event.button === 2) {
				copiedCoordinates.push({ x, y });

				const coordinatesStrings = copiedCoordinates.map(copiedCoordinate => `    ${getCoordinatesString(copiedCoordinate.x, copiedCoordinate.y)},`).join("\n");
				navigator.clipboard.writeText(`[\n${coordinatesStrings}\n]`);
			}
		};

		window.addEventListener("mousemove", updateMouseCoordinates);
		window.addEventListener("mousedown", copyMouseCoordinates);
	}
};