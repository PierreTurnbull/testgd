import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { CViewSortingCurve } from "@root/app/domains/viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { TViewSortingCurve } from "@root/app/domains/viewSortingCurve/types/viewSortingCurve.types";
import { AnimatedSprite } from "pixi.js";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getSortedEntities } from "./getSortedEntities";

const createEntity = (
	name: string,
	coordinates: TCoordinates,
	sortingCurve: TViewSortingCurve,
) => {
	const animatedSprite = new AnimatedSprite([]);
	animatedSprite.label = name;
	const entity = entityManager.createEntity(name, [
		new CLocation(coordinates),
		new CView(animatedSprite),
		new CViewSortingCurve(sortingCurve),
	]);

	return entity;
};

describe("getSortedEntities", () => {
	beforeEach(() => {
		vi.mock("@root/app/common/constants/views.constants", () => ({
			ENTITIES_CENTER_OFFSETS: {
				"1": { x: 0, y: 0 },
				"2": { x: 0, y: 0 },
			},
		}));
	});

	describe("Basic cases", () => {
		test("Entity1 before entity2", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0 }, { x: 1, y: 0 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 1 },
				[{ x: 0, y: 0 }, { x: 1, y: 0 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity1, entity2]);
		});

		test("Entity2 before entity1", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 1 },
				[{ x: 0, y: 0 }, { x: 1, y: 0 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0 }, { x: 1, y: 0 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity2, entity1]);
		});
	});

	describe("No x interval", () => {
		test("Entity1 before entity2", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0 }, { x: 1, y: 0 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 1 },
				[{ x: 2, y: 0 }, { x: 3, y: 0 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity1, entity2]);
		});

		test("Entity2 before entity1", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 1 },
				[{ x: 0, y: 0 }, { x: 1, y: 0 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 0 },
				[{ x: 2, y: 0 }, { x: 3, y: 0 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity2, entity1]);
		});
	});

	describe("Curves cross", () => {
		test("Entity1 and entity2 have same score", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0 }, { x: 1, y: 1 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 0 },
				[{ x: 0, y: 1 }, { x: 1, y: 0 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity1, entity2]);
		});

		test("Entity1 before entity2", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0 }, { x: 1, y: 1 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0.9 }, { x: 1, y: 0.9 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity1, entity2]);
		});

		test("Entity2 before entity1", () => {
			const entity1 = createEntity(
				"1",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0.9 }, { x: 1, y: 0.9 }],
			);

			const entity2 = createEntity(
				"2",
				{ x: 0, y: 0 },
				[{ x: 0, y: 0 }, { x: 1, y: 1 }],
			);

			const entities = [entity1, entity2];

			const sortedEntities = getSortedEntities(entities);

			expect(sortedEntities).toStrictEqual([entity2, entity1]);
		});
	});
});