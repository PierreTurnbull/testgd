import { Entity } from "../../entities/entity.models";

/**
 * The multiplicity of a node of a relation.
 */
export type TMultiplicity = "one" | "many";

/**
 * The cardinality of a relation.
 */
export type TCardinality = "one-to-one" | "one-to-many" | "many-to-many";

export type TRelationValue<T extends TMultiplicity> =
	T extends "one" ? Entity :
	T extends "many" ? Entity[] :
	never

/**
 * One of the two nodes of a relation. Its value is one or more entities depending on
 * its multiplicity, and a key used to identify this value.
 * eg: a value corresponding to an actor could be named "ally" (?-to-one).
 * eg: a value corresponding to multiple actors could be named "allies" (?-to-many).
 */
export type TRelationNode<T extends TMultiplicity> = {
	key:   string
	value: TRelationValue<T>
}

/**
 * A relation between two entities.
 */
export type TOneToOneRelation = {
	a: TRelationNode<"one">,
	b: TRelationNode<"one">,
}

/**
 * A relation between an entity and a list of entities.
 */
export type TOneToManyRelation = {
	a: TRelationNode<"one">,
	b: TRelationNode<"many">,
}

/**
 * A relation between two lists of entities.
 */
export type TManyToManyRelation = {
	a: TRelationNode<"many">,
	b: TRelationNode<"many">,
}

export type TRelation<T extends TCardinality> = (
	T extends "one-to-one" ? TOneToOneRelation :
	T extends "one-to-many" ? TOneToManyRelation :
	T extends "many-to-many" ? TManyToManyRelation :
	never
);

export type TAnyRelation = TOneToOneRelation | TOneToManyRelation | TManyToManyRelation