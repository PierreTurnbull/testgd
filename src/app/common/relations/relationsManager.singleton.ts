import { Component } from "../components/component.models";
import { Entity } from "../entities/entity.models";
import { entityManager } from "../entities/entityManager.singleton";
import { createEntity } from "../entities/utils/createEntity";
import { CRelation } from "./components/common/relation.component";
import { CManyToMany } from "./components/manyToMany/manyToMany.component";
import { CMustCascadeDelete } from "./components/mustCascadeDelete/mustCascadeDelete.component";
import { COneToMany } from "./components/oneToMany/oneToMany.component";
import { COneToOne } from "./components/oneToOne/oneToOne.component";
import { TAnyRelation, TManyToManyRelation, TMultiplicity, TOneToManyRelation, TOneToOneRelation, TRelationValue } from "./types/relation.types";

class RelationsManager {
	/**
	 * Gets relations. Entities are related using special entities named "relation".
	 * A relation is a special entity with the CRelation component.
	 */
	get relations() {
		return entityManager.entities.filter(entity => entity.hasComponent(CRelation));
	}

	/**
	 * Create a relation between entities.
	 */
	createRelation(relation: TAnyRelation) {
		const isOneToOne = ((relation: TAnyRelation): relation is TOneToOneRelation => {
			return (
				(relation.a.value as Entity[]).length === undefined ||
				(relation.b.value as Entity[]).length === undefined
			);
		})(relation);
		const isOneToMany = ((relation: TAnyRelation): relation is TOneToManyRelation => {
			return (
				(relation.a.value as Entity[]).length === undefined ||
				(relation.b.value as Entity[]).length !== undefined
			);
		})(relation);
		const isManyToMany = ((relation: TAnyRelation): relation is TManyToManyRelation => {
			return (
				(relation.a.value as Entity[]).length !== undefined ||
				(relation.b.value as Entity[]).length !== undefined
			);
		})(relation);

		let relationComponent: Component;

		if (isOneToOne) {
			relationComponent = new COneToOne(relation);
		} else if (isOneToMany) {
			relationComponent = new COneToMany(relation);
		} else if (isManyToMany) {
			relationComponent = new CManyToMany(relation);
		} else {
			throw new Error("Invalid relation.");
		}
	
		createEntity(
			"relation",
			[
				relationComponent,
				new CMustCascadeDelete(relation.mustCascadeDelete),
			],
		);
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
			}
			if (valueBIsList) {
				removeFromList(entity, valueB);
			}

			// delete the relation if needed

			if (
				(valueAIsList && valueA.length === 0) ||
				(valueBIsList && valueB.length === 0) ||
				(!valueAIsList && valueA === entity) ||
				(!valueBIsList && valueB === entity)
			) {
				const index = entityManager.entities.indexOf(relation);
				entityManager.entities.splice(index, 1);
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
}

export const relationsManager = new RelationsManager();