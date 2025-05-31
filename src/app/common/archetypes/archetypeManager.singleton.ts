import { Entity } from "../../domains/entity/entity.models";
import { ConstructorOf } from "../types/constructor.types";
import { actorArchetype } from "./actor/actor.archetype";
import { Archetype } from "./archetype.models";
import { colliderArchetype } from "./collider/collider.archetype";
import { damagerArchetype } from "./damager/damager.archetype";
import { fpsArchetype } from "./fps/fps.archetype";
import { hitboxArchetype } from "./hitbox/hitbox.archetype";
import { mortalArchetype } from "./mortal/mortal.archetype";
import { muddyBuddyArchetype } from "./muddyBuddy/muddyBuddy.archetype";
import { pathfinderArchetype } from "./pathfinder/pathfinder.archetype";
import { playerArchetype } from "./player/player.archetype";
import { projectileArchetype } from "./projectile/projectile.archetype";
import { rockLGArchetype } from "./rockLG/rockLG.archetype";
import { rockMDArchetype } from "./rockMD/rockMD.archetype";
import { sortableViewArchetype } from "./sortableView/sortableView.archetype";
import { wallArchetype } from "./wall/wall.archetype";

class ArchetypeManager {
	constructor() {
		this.archetypes.forEach(archetype => {
			const constructorName = archetype.constructor.name;

			this.archetypesByName.set(constructorName, archetype);
		});
	}

	archetypes: Archetype[] = [
		playerArchetype,
		muddyBuddyArchetype,
		actorArchetype,
		fpsArchetype,
		colliderArchetype,
		sortableViewArchetype,
		projectileArchetype,
		mortalArchetype,
		damagerArchetype,
		hitboxArchetype,
		wallArchetype,
		rockMDArchetype,
		rockLGArchetype,
		pathfinderArchetype,
	];
	archetypesByName = new Map<string, Archetype>();

	getArchetype<TArchetype extends Archetype>(archetypeClass: ConstructorOf<TArchetype>) {
		const archetype = this.archetypesByName.get(archetypeClass.name);
		if (!archetype) throw new Error(`Archetype ${archetypeClass.name} not found.`);
		const instanceMatchesClass =  ((archetype: Archetype): archetype is TArchetype => archetype instanceof archetypeClass)(archetype);
		if (!instanceMatchesClass) throw new Error(`Archetype ${archetype.constructor.name} does match class ${archetypeClass.name}.`);
		return archetype;
	};

	/**
	 * Registers the entity in the relevant archetypes.
	 */
	registerEntity = (entity: Entity) => {
		this.archetypes.forEach(archetype => {
			const missingComponent = archetype.requiredComponents.find(requiredComponent => {
				const component = entity.componentsByClass[requiredComponent.name];

				if (!component) {
					return requiredComponent;
				}
			});

			if (missingComponent) {
				return;
			}

			archetype.entities.add(entity);
			archetype.entitiesById.set(entity.id, entity);
		});
	};

	/**
	 * Removes the entity from the archetypes that reference it.
	 */
	removeEntityFromArchetypes = (entity: Entity) => {
		this.archetypes.forEach(archetype => {
			archetype.entities.delete(entity);
			archetype.entitiesById.delete(entity.id);
		});
	};
}

export const archetypeManager = new ArchetypeManager();