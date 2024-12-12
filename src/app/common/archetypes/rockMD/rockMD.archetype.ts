import { CRockMD } from "@root/app/domains/rockMD/components/rockMD/rockMD.component";
import { Archetype } from "../archetype.models";

export class ARockMD extends Archetype {
	constructor() {
		super([
			CRockMD,
		]);
	}
}

export const rockMDArchetype = new ARockMD();