import { archetypeManager } from "../archetypes/archetypeManager.singleton";
import { Component } from "../components/component.models";

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

		archetypeManager.classifyEntity(this);
	}

	addComponents(components: Component[]) {
		for (const component of components) {
			this.components.push(component);
		}

		archetypeManager.classifyEntity(this);
	}

	/**
	 * Removes a component based on its class.
	 * @param componentClass 
	 */
	removeComponent(componentClass: typeof Component) {
		const index = this.components.findIndex(component => component instanceof componentClass);
		this.components.splice(index, 1);

		archetypeManager.classifyEntity(this);
	}

	/**
	 * Returns the component of the specified type.
	 * @param componentClass 
	 * @returns 
	 */
	getComponent<TComponent extends typeof Component>(componentClass: TComponent): InstanceType<TComponent> {
		const component = this.components.find(component => component instanceof componentClass);
		if (!component) throw new Error(`Component ${componentClass.name} not found.`);
		const instanceMatchesClass =  ((component: Component): component is InstanceType<TComponent> => component instanceof componentClass)(component);
		if (!instanceMatchesClass) throw new Error(`Component ${component.constructor.name} does match class ${componentClass.name}.`);
		return component;
	}

	components: Component[] = [];
}