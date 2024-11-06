import { CWall } from "../../components/identity/wall.component";
import { Archetype } from "../archetype.models";

export class AWall extends Archetype {
	constructor() {
		super([
			CWall,
		]);
	}
}

export const wallArchetype = new AWall();