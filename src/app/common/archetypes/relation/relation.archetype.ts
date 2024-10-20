import { CRelation } from "../../relations/components/common/relation.component";
import { TCardinality } from "../../relations/types/relation.types";
import { Archetype } from "../archetype.models";

/**
 * Any relation between entities.
 */
export class ARelation<T extends TCardinality = TCardinality> extends Archetype {
	constructor() {
		super([
			CRelation<T>,
		]);
	}
}

export const relationArchetype = new ARelation();