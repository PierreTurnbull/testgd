import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CRockMD } from "@root/app/features/rockMD/components/rockMD/rockMD.component";

export class ARockMD extends Archetype {
	constructor() {
		super([
			CRockMD,
		]);
	}
}

export const rockMDArchetype = new ARockMD();