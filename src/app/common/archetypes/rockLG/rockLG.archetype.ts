import { CRockLG } from "@root/app/domains/rockLG/components/rockLG/rockLG.component";
import { Archetype } from "../archetype.models";

export class ARockLG extends Archetype {
	constructor() {
		super([
			CRockLG,
		]);
	}
}

export const rockLGArchetype = new ARockLG();