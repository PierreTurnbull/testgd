import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CWall } from "@root/app/features/wall/components/wall/wall.component";

export class AWall extends Archetype {
	constructor() {
		super([
			CWall,
		]);
	}
}

export const wallArchetype = new AWall();