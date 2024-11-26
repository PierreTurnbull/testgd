import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { CVisibilityGraph } from "@root/app/domains/pathfinding/components/visibilityGraph/visibilityGraph.component";
import { resetVisibilityGraph } from "@root/app/domains/pathfinding/utils/createVisibilityGraph/resetVisibilityGraph/resetVisibilityGraph";
import { Archetype } from "../archetypes/archetype.models";
import { archetypeManager } from "../archetypes/archetypeManager.singleton";
import { CBorderView } from "../components/border/border.component";
import { CCenterView } from "../components/centerView/centerView.component";
import { Component } from "../components/component.models";
import { CTimers } from "../components/timers/timers.component";
import { CView } from "../components/view/view.component";
import { CRelation } from "../relations/components/common/relation.component";
import { relationsManager } from "../relations/relationsManager.singleton";
import { TMultiplicity, TRelationNode } from "../relations/types/relation.types";
import { ConstructorOf } from "../types/constructor.types";
import { entityManager } from "./entityManager.singleton";
import { TEntitySettings } from "./types/entity.types";

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

	components = new Set<Component>();

	componentsByClass: Record<string, Component> = {};
	archetypes:        Set<Archetype> = new Set<Archetype>();
	relations:         Map<string, Entity> = new Map<string, Entity>();

	private _addComponent(component: Component) {
		this.components.add(component);
		this.componentsByClass[component.constructor.name] = component;
	}

	addComponent = (component: Component) => {
		this._addComponent(component);

		archetypeManager.removeEntityFromArchetypes(this);
		archetypeManager.registerEntity(this);
	};

	addComponents(components: Component[]) {
		for (const component of components) {
			this._addComponent(component);
		}

		archetypeManager.removeEntityFromArchetypes(this);
		archetypeManager.registerEntity(this);
	}

	/**
	 * Removes a component based on its class.
	 */
	removeComponent<TComponent extends Component>(componentClass: ConstructorOf<TComponent>) {
		this.components.delete(this.componentsByClass[componentClass.name]);

		delete this.componentsByClass[componentClass.name];

		archetypeManager.removeEntityFromArchetypes(this);
		archetypeManager.registerEntity(this);
	}

	/**
	 * Returns the component of the specified type.
	 */
	getComponent<TComponent extends Component>(componentClass: ConstructorOf<TComponent>): TComponent {
		const component = this.componentsByClass[componentClass.name];
		if (!component) throw new Error(`Component ${componentClass.name} not found.`);
		const instanceMatchesClass =  ((component: Component): component is TComponent => component instanceof componentClass)(component);
		if (!instanceMatchesClass) throw new Error(`Component ${component.constructor.name} does match class ${componentClass.name}.`);
		return component;
	}

	/**
	 * Returns whether the entity has a component of the specified type.
	 */
	hasComponent<TComponent extends Component>(componentClass: ConstructorOf<TComponent>): boolean {
		const component = this.componentsByClass[componentClass.name];
		return Boolean(component);
	}

	/**
	 * Finds a relation node among all the relations of the entity.
	 * @param relationName the key of the related entities specified in the relation.
	 */
	private getRelatedNode(relationName: string) {
		const relationEntity = this.getRelation(relationName);
		const relationComponent = relationEntity.getComponent(CRelation);

		let relatedNode: TRelationNode<TMultiplicity> | null = null;
		if (relationComponent.relation.a.key === relationName) {
			relatedNode = relationComponent.relation.a;
		} else if (relationComponent.relation.b.key === relationName) {
			relatedNode = relationComponent.relation.b;
		}

		if (!relatedNode) {
			throw new Error(`Relation node ${relationName} not found.`);
		}

		return relatedNode;
	}

	/**
	 * Returns the related entities.
	 * @param relationName the key of the related entities specified in the relation.
	 */
	getRelatedEntities(relationName: string) {
		const relatedNode = this.getRelatedNode(relationName);
		const value = relatedNode.value;

		const isList = ((value: Entity | Entity[]): value is Entity[] => (value as Entity[]).length !== undefined)(value);

		if (!isList) {
			throw new Error(`Relation node ${relationName} is not a list.`);
		}

		return value;
	}

	/**
	 * Returns the related entity.
	 * @param relationName the key of the related entity specified in the relation.
	 */
	getRelatedEntity(relationName: string) {
		const relatedNode = this.getRelatedNode(relationName);
		const value = relatedNode.value;

		const isList = ((value: Entity | Entity[]): value is Entity[] => (value as Entity[]).length !== undefined)(value);

		if (isList) {
			throw new Error(`Relation node ${relationName} is a list.`);
		}

		return value;
	}

	/**
	 * Returns the relation corresponding to the key.
	 */
	getRelation(relationName: string) {
		const relation = this.relations.get(relationName);

		if (!relation) {
			throw new Error(`Missing relation: "${relationName}".`);
		}

		return relation;
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

		if (configManager.config.debug.showsEntityCenters && this.hasComponent(CCenterView)) {
			const centerViewComponent = this.getComponent(CCenterView);
	
			centerViewComponent.center.destroy();
		}

		// destroy hitboxes

		if (this.relations.has("hitboxes")) {
			const hitboxEntities = this.getRelatedEntities("hitboxes");

			hitboxEntities.forEach(hitboxEntity => {
				const hitboxComponent = hitboxEntity.getComponent(CHitbox);

				collisionsManager.system.remove(hitboxComponent.body);

				if (configManager.config.debug.showsEntityHitboxes && hitboxEntity.hasComponent(CHitboxView)) {
					const hitboxViewComponent = hitboxEntity.getComponent(CHitboxView);
			
					hitboxViewComponent.hitboxBorder.destroy();
				}
			});
		}

		// remove from archetypes

		archetypeManager.removeEntityFromArchetypes(this);

		// remove from relations

		relationsManager.removeFromRelations(this);

		// clear timers

		if (this.hasComponent(CTimers)) {
			const timersComponent = this.getComponent(CTimers);

			timersComponent.timers.forEach(clearTimeout);
		}

		// remove the entity from the list of entities

		entityManager.removeEntity(this);

		// reset the entity's visibility graph

		if (this.hasComponent(CVisibilityGraph)) {
			resetVisibilityGraph(this.getComponent(CVisibilityGraph));
		}

		// onDestroy

		this.onDestroy?.();
	}

	onDestroy?: () => void;
}