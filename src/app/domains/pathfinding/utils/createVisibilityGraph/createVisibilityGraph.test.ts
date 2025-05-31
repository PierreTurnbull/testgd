import { wallArchetype } from "@root/app/common/archetypes/wall/wall.archetype";
import { Entity } from "@root/app/domains/entity/entity.models";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { HITBOX_BOUNDS } from "@root/app/domains/hitbox/constants/hitboxes.constants";
import { createHitbox } from "@root/app/domains/hitbox/utils/createHitbox";
import { relationsManager } from "@root/app/domains/relationManager/relationsManager.singleton";
import { createWall } from "@root/app/domains/wall/utils/createWall";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CVisibilityGraph } from "../../components/visibilityGraph/visibilityGraph.component";
import { createVisibilityGraph } from "./createVisibilityGraph";

vi.mock("@root/app/domains/hitbox/constants/hitboxes.constants", async (importOriginal) => {
	const ret: { HITBOX_BOUNDS: typeof HITBOX_BOUNDS } = await importOriginal();

	ret["HITBOX_BOUNDS"]["characters.test.motion"] = { w: 40, h: 40 };
	
	return ret;
});

describe("createVisibilityGraph", async () => {
	let entity: Entity;
	let visibilityGraphComponent: CVisibilityGraph;

	beforeEach(() => {
		entity = entityManager.createEntity("test", [
			new CVisibilityGraph(),
		]);
		relationsManager.createRelation({
			a: {
				key:   "parent",
				value: entity, 
			},
			b: {
				key:   "hitboxes",
				value: [], 
			},
			mustCascadeDelete: false,
		});
		createHitbox(entity, {
			motionCollisionCandidates:      [wallArchetype],
			pathfindingCollisionCandidates: [wallArchetype],
			shape:                          "rectangle",
			initialCoordinates:             { x: 0, y: 0 },
			offset:                         { x: 0, y: 0 },
			type:                           "motion",
			name:                           "characters.test.motion",
			isActive:                       true,
		});

		visibilityGraphComponent = entity.getComponent(CVisibilityGraph);
	});

	afterEach(() => {
		entityManager.entities.forEach(entity => entity.destroy());
	});

	describe("No obstacles", () => {
		test("Number of nodes", () => {
			createVisibilityGraph(entity);
			expect(visibilityGraphComponent.nodes).toHaveLength(0);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(0);
		});
	});

	describe("1 shape.", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(4);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(4);
		});
	});

	describe("2 shapes.", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 200, y: 200 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(8);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(17);
		});
	});

	describe("3 shapes, without obstruction of line of view", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 200, y: 200 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 400, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(12);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(34);
		});
	});

	describe("3 shapes, one being between the others", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 200, y: 200 }, [
				{ x: 0, y: 0 },
				{ x: 100, y: 0 },
				{ x: 100, y: 100 },
				{ x: 0, y: 100 },
			]);
			createWall({ x: 400, y: 400 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(12);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(30);
		});
	});

	describe("2 shapes that collide", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 50, y: 50 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(8);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(6);
		});
	});

	describe("2 shapes share collinear segments", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 50, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(8);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(8);
		});
	});

	describe("Entangled shapes", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 100 },
				{ x: 0, y: 100 },
			]);
			createWall({ x: 0, y: 0 }, [
				{ x: 50, y: 0 },
				{ x: 100, y: 0 },
				{ x: 100, y: 100 },
				{ x: 50, y: 100 },
			]);
			createWall({ x: 25, y: -25 }, [
				{ x: 0, y: 0 },
				{ x: 100, y: 0 },
				{ x: 100, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 25, y: -25 }, [
				{ x: 0, y: 50 },
				{ x: 100, y: 50 },
				{ x: 100, y: 100 },
				{ x: 0, y: 100 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(16);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(12);
		});
	});

	describe("Shape fully inside other shape", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 25, y: 0 },
				{ x: 25, y: 25 },
				{ x: 0, y: 25 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(8);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(4);
		});
	});

	describe("Shapes with no point collision, but segment intersections", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 100, y: 0 },
				{ x: 100, y: 50 },
				{ x: 0, y: 50 },
			]);
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 50, y: 0 },
				{ x: 50, y: 100 },
				{ x: 0, y: 100 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(8);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(8);
		});
	});

	describe("Sharp edges", () => {
		beforeEach(() => {
			createWall({ x: 0, y: 0 }, [
				{ x: 0, y: 0 },
				{ x: 200, y: 50 },
				{ x: 100, y: 40 },
			]);

			createVisibilityGraph(entity);
		});

		test("Number of nodes", () => {
			expect(visibilityGraphComponent.nodes).toHaveLength(7);
		});

		test("Number of links between nodes", () => {
			expect(visibilityGraphComponent.linkedNodes).toHaveLength(7);
		});
	});
});