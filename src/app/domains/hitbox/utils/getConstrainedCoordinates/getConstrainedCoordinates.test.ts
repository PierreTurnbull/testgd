import { CLocation } from "@root/app/common/components/location/location.component";
import { Entity } from "@root/app/common/entities/entity.models";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { getConstrainedCoordinates } from "./getConstrainedCoordinates";

describe("translateInputs", async () => {
	await assetsManager.loadSpritesheets();

	let entity: Entity;
	let locationComponent: CLocation;
	let hitboxComponent: CHitbox;
	const initialCoordinates = { x: 0, y: 0 };

	beforeEach(async () => {
		entity = createPlayer(initialCoordinates);
		locationComponent = entity.getComponent(CLocation);
		hitboxComponent = entity.getRelatedEntities("hitboxes")[0].getComponent(CHitbox);
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
		const box = collisionsManager.system.createBox({ x: hitboxComponent.body.maxX + 0.5, y: hitboxComponent.body.minY }, 1, 1);
		const constrainedNextCoordinates = getConstrainedCoordinates(entity, nextCoordinates);
		expect(constrainedNextCoordinates).toEqual({ x: 0.5, y: 0 });
		collisionsManager.system.remove(box);
	});

	test("The inputs are not altered", () => {
		const nextCoordinates = { x: 1, y: 0 };
		getConstrainedCoordinates(entity, nextCoordinates);
		expect(locationComponent.coordinates).toBe(initialCoordinates);
		expect(nextCoordinates).toEqual({ x: 1, y: 0 });
	});
});