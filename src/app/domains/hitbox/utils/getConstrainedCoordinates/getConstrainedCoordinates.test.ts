import { CLocation } from "@root/app/common/components/location/location.component";
import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { Entity } from "@root/app/domains/entity/entity.models";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";
import { createWall } from "@root/app/domains/wall/utils/createWall";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { HITBOX_BOUNDS } from "../../constants/hitboxes.constants";
import { getConstrainedCoordinates } from "./getConstrainedCoordinates";

describe("translateInputs", async () => {
	await assetsManager.loadAssets();

	let entity: Entity;
	let locationComponent: CLocation;
	const initialCoordinates = { x: 0, y: 0 };

	beforeEach(async () => {
		entity = createPlayer(initialCoordinates);
		locationComponent = entity.getComponent(CLocation);
	});

	afterEach(() => {
		entity.destroy();
	});

	test("Next coordinates are not altered when there is no obstacle", () => {
		const nextCoordinates = { x: 1, y: 0 };
		const constrainedNextCoordinates = getConstrainedCoordinates(entity, nextCoordinates);
		expect(constrainedNextCoordinates).toEqual({ x: 1, y: 0 });
	});

	test("Next coordinates are constrained when there is an obstacle", () => {
		const nextCoordinates = { x: 1, y: 0 };
		const wallCoordinates = {
			x: HITBOX_BOUNDS["characters.player.motion"].w / 2 + 1,
			y: 0,
		};
		const wallPoints = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
		];
		createWall(
			wallCoordinates,
			wallPoints,
		);
		const constrainedNextCoordinates = getConstrainedCoordinates(entity, nextCoordinates);
		expect(constrainedNextCoordinates).toEqual({ x: 0.5, y: 0 });
	});

	test("The inputs are not altered", () => {
		const nextCoordinates = { x: 1, y: 0 };
		getConstrainedCoordinates(entity, nextCoordinates);
		expect(locationComponent.coordinates).toBe(initialCoordinates);
		expect(nextCoordinates).toEqual({ x: 1, y: 0 });
	});
});