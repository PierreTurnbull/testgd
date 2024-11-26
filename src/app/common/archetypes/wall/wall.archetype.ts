import { CWall } from "@root/app/domains/wall/components/wall/wall.component";
import { Archetype } from "../archetype.models";

export class AWall extends Archetype {
	constructor() {
		super([
			CWall,
		]);
	}
}

export const wallArchetype = new AWall();