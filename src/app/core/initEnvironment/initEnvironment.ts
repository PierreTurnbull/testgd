import { actorArchetype } from "@root/app/common/archetypes/actor/actor.archetype";
import { CWall } from "@root/app/common/components/identity/wall.component";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";
import { createHitbox } from "@root/app/domains/hitbox/utils/createHitbox";
import { createWall } from "@root/app/domains/wall/utils/createWall";

export const initEnvironment = () => {
	for (let i = -5; i < 5; i++) {
		for (let j = -5; j < 5; j++) {
			initSprite("environment.dirt." + Math.floor(Math.random() * 10), {
				x: j * 256 * 3,
				y: i * 256 * 3,
			});
		}
	}

	createWall(
		{ x: 0, y: 100 },
		[
			{ x: 0, y: 0 },
			{ x: 200, y: 0 },
			{ x: 300, y: 100 },
			{ x: 280, y: 120 },
			{ x: 180, y: 30 },
			{ x: 0, y: 30 },
		],
	);
	createWall(
		{ x: 0, y: 230 },
		[
			{ x: 0, y: 0 },
			{ x: 300, y: 0 },
			{ x: 300, y: 30 },
			{ x: 0, y: 30 },
		],
	);
	createWall(
		{ x: 100, y: 350 },
		[
			{ x: 0, y: 0 },
			{ x: 200, y: 50 },
			{ x: 200, y: 80 },
			{ x: 0, y: 30 },
		],
	);
	createWall(
		{ x: 220, y: 100 },
		[
			{ x: 0, y: 0 },
			{ x: 0, y: 500 },
			{ x: 30, y: 500 },
			{ x: 30, y: 0 },
		],
	);
	createWall(
		{ x: -200, y: 140 },
		[
			{ x: 0, y: 0 },
			{ x: 400, y: 0 },
			{ x: 400, y: 30 },
			{ x: 0, y: 30 },
		],
	);
};