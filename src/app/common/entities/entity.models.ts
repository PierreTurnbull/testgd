import { Component } from "../components/component.models";
import { CRelation } from "../relations/components/common/relation.component";
import { relationsManager } from "../relations/relationsManager.singleton";
import { ConstructorOf } from "../types/constructor.types";
import { entityManager } from "./entityManager.singleton";

let nextId = 0;

export class Entity {
	constructor() {
		this.id = nextId++;
	}

	__brand = "entity";

	id: number;

	name: string = "unknown";

	addComponent(component: Component) {
		this.components.push(component);
	}

	addComponents(components: Component[]) {
		for (const component of components) {
			this.components.push(component);
		}
	}

	/**
	 * Removes a component based on its class.
	 * @param componentClass 
	 */
	removeComponent(componentClass: typeof Component) {
		const index = this.components.findIndex(component => component instanceof componentClass);
		this.components.splice(index, 1);
	}

	/**
	 * Returns the component of the specified type.
	 * @param componentClass 
	 * @returns 
	 */
	getComponent<TComponent extends Component>(componentClass: ConstructorOf<TComponent>): TComponent {
		const component = this.components.find(component => component instanceof componentClass);
		if (!component) throw new Error(`Component ${componentClass.name} not found.`);
		const instanceMatchesClass =  ((component: Component): component is TComponent => component instanceof componentClass)(component);
		if (!instanceMatchesClass) throw new Error(`Component ${component.constructor.name} does match class ${componentClass.name}.`);
		return component;
	}

	/**
	 * Returns whether the entity has a component of the specified type.
	 */
	hasComponent<TComponent extends Component>(componentClass: ConstructorOf<TComponent>): boolean {
		const component = this.components.find(component => component instanceof componentClass);
		return Boolean(component);
	}

	/**
	 * Returns the relations that reference the entity.
	 */
	get relations() {
		return relationsManager.getRelationsOfEntity(this);
	}

	/**
	 * Finds a relation node among all the relations of the entity.
	 * @param entityName the key of the related entities specified in the relation.
	 */
	getRelatedNode(entityName: string) {
		const relationComponents = this.relations.map(relation => relation.getComponent(CRelation));
		const relationNodes = relationComponents.map(relationComponent => [relationComponent.relation.a, relationComponent.relation.b]).flat();
		const relationNode = relationNodes.find(relationNode => relationNode.key === entityName);
		if (!relationNode) {
			throw new Error(`Relation node ${entityName} not found.`);
		}

		return relationNode;
	}

	/**
	 * Returns the related entities.
	 * @param entityName the key of the related entities specified in the relation.
	 */
	getRelatedEntities(entityName: string) {
		const relatedNode = this.getRelatedNode(entityName);
		const value = relatedNode.value;

		const isList = ((value: Entity | Entity[]): value is Entity[] => (value as Entity[]).length !== undefined)(value);

		if (!isList) {
			throw new Error(`Relation node ${entityName} is not a list.`);
		}

		return value;
	}

	/**
	 * Returns the related entity.
	 * @param entityName the key of the related entity specified in the relation.
	 */
	getRelatedEntity(entityName: string) {
		const relatedNode = this.getRelatedNode(entityName);
		const value = relatedNode.value;

		const isList = ((value: Entity | Entity[]): value is Entity[] => (value as Entity[]).length !== undefined)(value);

		if (isList) {
			throw new Error(`Relation node ${entityName} is a list.`);
		}

		return value;
	}

	/**
	 * Destroys the entity.
	 */
	destroy() {
		entityManager.destroyEntity(this);
	}

	components: Component[] = [];
}