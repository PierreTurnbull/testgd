import { TRelationNode } from "../types/relation.types";

export const getIsOne = (relationNode: TRelationNode<"many"> | TRelationNode<"one">): relationNode is TRelationNode<"one"> => {
	return (relationNode as TRelationNode<"many">).value.length === undefined;
};
export const getIsMany = (relationNode: TRelationNode<"many"> | TRelationNode<"one">): relationNode is TRelationNode<"many"> => {
	return (relationNode as TRelationNode<"many">).value.length !== undefined;
};