import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { Archetype } from "../archetypes/archetype.models";
import { archetypeManager } from "../archetypes/archetypeManager.singleton";
import { CBorderView } from "../components/border/border.component";
import { CCenterView } from "../components/centerView/centerView.component";
import { Component } from "../components/component.models";
import { CTimers } from "../components/timers/timers.component";
import { CView } from "../components/view/view.component";
import { relationsManager } from "../relations/relationsManager.singleton";
import { ConstructorOf } from "../types/constructor.types";
import { entityManager } from "./entityManager.singleton";
import { TEntitySettings } from "./types/entity.types";
import { CRelation } from "../relations/components/common/relation.component";

let nextId = 0;

export class Entity {
	constructor(
		settings?: TEntitySettings,
	) {
		this.id = nextId++;

		this.onDestroy = settings?.onDestroy;
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
	 */
	removeComponent<TComponent extends Component>(componentClass: ConstructorOf<TComponent>) {
		const index = this.components.findIndex(component => component instanceof componentClass);
		this.components.splice(index, 1);
	}

	/**
	 * Returns the component of the specified type.
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
	private getRelatedNode(entityName: string) {
		const relationComponents = this.relations.map(relation => relation.getComponent(CRelation));
		const relationNodes = relationComponents.map(relationComponent => [relationComponent.relation.a, relationComponent.relation.b]).flat();
		const relationNode = relationNodes.find(relationNode => relationNode.key === entityName);
		if (!relationNode) {
			throw new Error(`Relation node ${entityName} not found.`);
		}

		return relationNode;
	}

	/**
	 * Returns whether the relation node exists.
	 * @param entityName the key of the related entities specified in the relation.
	 */
	private getHasRelatedNode(entityName: string) {
		const relationComponents = this.relations.map(relation => relation.getComponent(CRelation));
		const relationNodes = relationComponents.map(relationComponent => [relationComponent.relation.a, relationComponent.relation.b]).flat();
		const relationNode = relationNodes.find(relationNode => relationNode.key === entityName);

		return Boolean(relationNode);
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
	 * Returns the relation corresponding to the key.
	 */
	getRelation(key: string) {
		const relation = this.relations.find(relation => {
			const relationComponent = relation.getComponent(CRelation);
			return (
				relationComponent.relation.a.key === key ||
				relationComponent.relation.b.key === key
			);
		});
		if (!relation) {
			throw new Error("Missing hitboxes relation.");
		}

		return relation;
	}

	/**
	 * Returns whether the entity has a relation.
	 * @param entityName the key of the related entity specified in the relation.
	 */
	hasRelation(entityName: string) {
		return this.getHasRelatedNode(entityName);
	}

	/**
	 * Returns whether the entity matches the archetype.
	 */
	matchesArchetype<TArchetype extends ConstructorOf<Archetype>>(archetype: TArchetype) {
		return archetypeManager.getArchetype(archetype).entities.includes(this);
	}

	/**
	 * Destroys the entity.
	 */
	destroy() {
		if (!(this instanceof Entity)) {
			throw new Error("Entity has already been destroyed.");
		}

		// destroy views

		if (this.hasComponent(CView)) {
			const viewComponent = this.getComponent(CView);
	
			viewComponent.animatedSprite.destroy();
		}
	
		if (configManager.config.debug.showsEntityBorders && this.hasComponent(CBorderView)) {
			const borderViewComponent = this.getComponent(CBorderView);
	
			borderViewComponent.border.destroy();
		}

		if (configManager.config.debug.showsEntityCenter && this.hasComponent(CCenterView)) {
			const centerViewComponent = this.getComponent(CCenterView);
	
			centerViewComponent.center.destroy();
		}

		// destroy hitboxes

		if (this.hasRelation("hitboxes")) {
			const hitboxEntities = this.getRelatedEntities("hitboxes");

			hitboxEntities.forEach(hitboxEntity => {
				const hitboxComponent = hitboxEntity.getComponent(CHitbox);

				collisionsManager.system.remove(hitboxComponent.body);

				if (configManager.config.debug.showsEntityHitbox && hitboxEntity.hasComponent(CHitboxView)) {
					const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);
			
					hitboxViewComponent.hitboxBorder.destroy();
				}
			});
		}

		// remove from relations

		relationsManager.removeFromRelations(this);

		// clear timers

		if (this.hasComponent(CTimers)) {
			const timersComponent = this.getComponent(CTimers);

			timersComponent.timers.forEach(clearTimeout);
		}

		// remove the entity from the list of entities

		entityManager.removeEntity(this);

		// onDestroy

		this.onDestroy?.();
	}

	components: Component[] = [];
	onDestroy?: () => void;
}