import { Entity } from "../entities/entity.models";
import { actorArchetype } from "./actor/actor.archetype";
import { Archetype } from "./archetype.models";
import { fpsArchetype } from "./fps/fps.archetype";
import { muddyBuddyArchetype } from "./muddyBuddy/muddyBuddy.archetype";
import { playerArchetype } from "./player/player.archetype";

class ArchetypeManager {
	archetypes: Archetype[] = [
		playerArchetype,
		muddyBuddyArchetype,
		actorArchetype,
		fpsArchetype,
	];

	getArchetype<TArchetype extends typeof Archetype>(archetypeClass: TArchetype): InstanceType<TArchetype> {
		const archetype = this.archetypes.find(archetype => archetype instanceof archetypeClass);
		if (!archetype) throw new Error(`Archetype ${archetypeClass.name} not found.`);
		const instanceMatchesClass =  ((archetype: Archetype): archetype is InstanceType<TArchetype> => archetype instanceof archetypeClass)(archetype);
		if (!instanceMatchesClass) throw new Error(`Archetype ${archetype.constructor.name} does match class ${archetypeClass.name}.`);
		return archetype;
	};

	getEntitiesByArchetype<TArchetype extends typeof Archetype>(archetypeClass: TArchetype) {
		const archetype = this.getArchetype(archetypeClass);
		return archetype.entities;
	}

	classifyEntity(entity: Entity) {
		for (const archetype of this.archetypes) {
			const entityMatchesArchetype = archetype.entityMatchesArchetype(entity);

			const canAddEntityToArchetype = entityMatchesArchetype && !archetype.entities[entity.id];
			const canRemoveEntityFromArchetype = !entityMatchesArchetype && archetype.entities[entity.id];

			if (canAddEntityToArchetype) {
				archetype.addEntity(entity);
			} else if (canRemoveEntityFromArchetype) {
				archetype.removeEntity(entity.id);
			}
		}
	}
}

export const archetypeManager = new ArchetypeManager();