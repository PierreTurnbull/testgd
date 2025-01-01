import { Component } from "../components/component.models";
import { Entity } from "../entities/entity.models";
import { entityManager } from "../entities/entityManager.singleton";
import { CRelation } from "./components/common/relation.component";
import { CManyToMany } from "./components/manyToMany/manyToMany.component";
import { CManyToOne } from "./components/manyToOne/manyToOne.component";
import { CMustCascadeDelete } from "./components/mustCascadeDelete/mustCascadeDelete.component";
import { COneToMany } from "./components/oneToMany/oneToMany.component";
import { COneToOne } from "./components/oneToOne/oneToOne.component";
import { TAnyRelation, TMultiplicity, TRelationNode, TRelationValue } from "./types/relation.types";
import { getIsManyToMany, getIsManyToOne, getIsOneToMany, getIsOneToOne } from "./utils/cardinalityTypeguards";
import { getIsMany } from "./utils/multiplicityTypeguards";

class RelationsManager {
	/**
	 * Entities are related using special entities named "relation".
	 * A relation is a special entity with the CRelation component.
	 */
	relations = new Set<Entity>();

	/**
	 * Create a relation between entities.
	 */
	createRelation(relation: TAnyRelation) {
		const isOneToOne = getIsOneToOne(relation);
		const isOneToMany = getIsOneToMany(relation);
		const isManyToOne = getIsManyToOne(relation);
		const isManyToMany = getIsManyToMany(relation);

		let relationComponent: Component;

		if (isOneToOne) {
			relationComponent = new COneToOne(relation);
		} else if (isOneToMany) {
			relationComponent = new COneToMany(relation);
		} else if (isManyToOne) {
			relationComponent = new CManyToOne(relation);
		} else if (isManyToMany) {
			relationComponent = new CManyToMany(relation);
		} else {
			throw new Error("Invalid relation.");
		}
	
		const relationEntity = entityManager.createEntity(
			"relation",
			[
				relationComponent,
				new CMustCascadeDelete(relation.mustCascadeDelete),
			],
		);

		// add the relation to the entities

		if (isOneToOne || isOneToMany) {
			relation.a.value.relations.set(relation.b.key, relationEntity);
		}
		if (isManyToMany || isManyToOne) {
			relation.a.value.forEach(entity => entity.relations.set(relation.a.key, relationEntity));
		}
		if (isOneToOne || isManyToOne) {
			relation.b.value.relations.set(relation.a.key, relationEntity);
		}
		if (isOneToMany || isManyToMany) {
			relation.b.value.forEach(entity => entity.relations.set(relation.a.key, relationEntity));
		}
	}

	/**
	 * Returns the relations that reference the specified entity.
	 */
	getRelationsOfEntity(entity: Entity) {
		const relations: Entity[] = [];

		const getIsList = (value: TRelationValue<TMultiplicity>): value is TRelationValue<"many"> => {
			return (value as TRelationValue<"many">).length !== undefined;
		};

		this.relations.forEach(relation => {
			const relationComponent = relation.getComponent(CRelation);

			const valueA = relationComponent.relation.a.value;
			const valueB = relationComponent.relation.b.value;

			const valueAIsList = getIsList(valueA);
			const valueBIsList = getIsList(valueB);

			if (
				(valueAIsList && valueA.includes(entity)) ||
				(valueBIsList && valueB.includes(entity)) ||
				(!valueAIsList && valueA === entity) ||
				(!valueBIsList && valueB === entity)
			) {
				relations.push(relation);
			}
		});

		return relations;
	}

	/**
	 * Removes an entity from all the relations that reference it.
	 */
	removeFromRelations(entity: Entity) {
		const getIsList = (value: TRelationValue<TMultiplicity>): value is TRelationValue<"many"> => {
			return (value as TRelationValue<"many">).length !== undefined;
		};

		const relationsOfEntity = this.getRelationsOfEntity(entity);

		for (let i = 0; i < relationsOfEntity.length; i++) {
			const relation = relationsOfEntity[i];
			const relationComponent = relation.getComponent(CRelation);
			const mustCascadeDeleteComponent = relation.getComponent(CMustCascadeDelete);

			const valueA = relationComponent.relation.a.value;
			const valueB = relationComponent.relation.b.value;

			const valueAIsList = getIsList(valueA);
			const valueBIsList = getIsList(valueB);

			// delete subscriptions of the entity to the relation

			/**
			 * Returns whether the entity is in the relation value.
			 */
			const getEntityIsInValue = (
				entity: Entity,
				value: Entity | Entity[],
			) => {
				const isList = getIsList(value);
				let entityIsInValue = false;

				if (isList) {
					const index = value.indexOf(entity);
					if (index > -1) {
						entityIsInValue = true;
					}
				} else if (value === entity) {
					entityIsInValue = true;
				}

				return entityIsInValue;
			};

			const entityIsParent = getEntityIsInValue(entity, valueA);

			/**
			 * Removes an entity from a list of entities.
			 */
			const removeFromList = (entity: Entity, value: Entity[]) => {
				const index = value.indexOf(entity);
				if (index > -1) {
					value.splice(index, 1);
				}
			};

			if (valueAIsList) {
				removeFromList(entity, valueA);
				entity.relations.delete(relationComponent.relation.b.key);
			}
			if (valueBIsList) {
				removeFromList(entity, valueB);
				entity.relations.delete(relationComponent.relation.a.key);
			}

			// delete the relation if it is not referenced by any entity

			const valueAIsEmpty = (
				(valueAIsList && valueA.length === 0) ||
				(!valueAIsList && valueA === entity)
			);
			const valueBIsEmpty = (
				(valueBIsList && valueB.length === 0) ||
				(!valueBIsList && valueB === entity)
			);

			if (valueAIsEmpty && valueBIsEmpty) {
				// remove from entitiesManager
				entityManager.entities.delete(relation);
				entityManager.entitiesById.delete(relation.id);

				// remove from relationsManager
				this.relations.delete(relation);
			}

			// cascade delete

			if (entityIsParent && mustCascadeDeleteComponent.mustCascadeDelete) {
				if (valueBIsList) {
					valueB.forEach(item => item.destroy());
				} else {
					valueB.destroy();
				}
			}
		}
	}

	/**
	 * Appends an entity to a list of entities in a relation.
	 */
	appendToRelation(
		/**
		 * The relation in which the entity will be added.
		 */
		relationEntity: Entity,
		/**
		 * The entity to add to the relation.
		 */
		entity: Entity,
		/**
		 * The name of the relation node that will contain the provided entity.
		 */
		relationName: string,
	) {
		const relation = relationEntity.getComponent(CRelation).relation;

		let relationNode: TRelationNode<"many"> | TRelationNode<"one">;
		let oppositeRelationNode: TRelationNode<"many"> | TRelationNode<"one">;
		if (relation.a.key === relationName) {
			relationNode = relation.a;
			oppositeRelationNode = relation.b;
		} else {
			relationNode = relation.b;
			oppositeRelationNode = relation.a;
		}

		if (!getIsMany(relationNode)) {
			throw new Error(`Cannot add entity "${entity.name}" to relation node "${relationName}". The multiplicity of the relation node must be "many", but it is "one".`);
		}

		relationNode.value.push(entity);

		// save the relation in the entity

		entity.relations.set(oppositeRelationNode.key, relationEntity);
	}
}

export const relationsManager = new RelationsManager();