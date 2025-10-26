import { Archetype } from "@root/app/ecs/archetypes/models/archetype.models";
import { CRelation } from "../components/common/relation.component";
import { TCardinality } from "../types/relation.types";

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