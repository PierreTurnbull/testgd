import { CRock } from "@root/app/domains/rock/components/rock/rock.component";
import { Archetype } from "../archetype.models";

export class ARock extends Archetype {
	constructor() {
		super([
			CRock,
		]);
	}
}

export const rockArchetype = new ARock();