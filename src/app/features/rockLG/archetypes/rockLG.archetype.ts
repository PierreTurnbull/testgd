import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CRockLG } from "@root/app/features/rockLG/components/rockLG/rockLG.component";

export class ARockLG extends Archetype {
	constructor() {
		super([
			CRockLG,
		]);
	}
}

export const rockLGArchetype = new ARockLG();