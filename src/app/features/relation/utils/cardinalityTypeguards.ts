import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { TAnyRelation, TManyToManyRelation, TManyToOneRelation, TOneToManyRelation, TOneToOneRelation } from "../types/relation.types";

export const getIsOneToOne = (relation: TAnyRelation): relation is TOneToOneRelation => {
	return (
		(relation.a.value as Entity[]).length === undefined &&
		(relation.b.value as Entity[]).length === undefined
	);
};
export const getIsOneToMany = (relation: TAnyRelation): relation is TOneToManyRelation => {
	return (
		(relation.a.value as Entity[]).length === undefined &&
		(relation.b.value as Entity[]).length !== undefined
	);
};
export const getIsManyToOne = (relation: TAnyRelation): relation is TManyToOneRelation => {
	return (
		(relation.a.value as Entity[]).length !== undefined &&
		(relation.b.value as Entity[]).length === undefined
	);
};
export const getIsManyToMany = (relation: TAnyRelation): relation is TManyToManyRelation => {
	return (
		(relation.a.value as Entity[]).length !== undefined &&
		(relation.b.value as Entity[]).length !== undefined
	);
};