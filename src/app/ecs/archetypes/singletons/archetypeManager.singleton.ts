import { fpsArchetype } from "@root/app/features/fps/archetypes/fps.archetype";
import { hitboxArchetype } from "@root/app/features/hitbox/archetypes/hitbox.archetype";
import { mouseCoordinatesArchetype } from "@root/app/features/mouseCoordinates/archetypes/mouseCoordinates.archetype";
import { muddyBuddyArchetype } from "@root/app/features/muddyBuddy/archetypes/muddyBuddy.archetype";
import { pathfinderArchetype } from "@root/app/features/pathfinding/archetypes/pathfinder.archetype";
import { playerArchetype } from "@root/app/features/player/archetypes/player.archetype";
import { projectileArchetype } from "@root/app/features/projectile/archetypes/projectile.archetype";
import { rockLGArchetype } from "@root/app/features/rockLG/archetypes/rockLG.archetype";
import { rockMDArchetype } from "@root/app/features/rockMD/archetypes/rockMD.archetype";
import { sortableViewArchetype } from "@root/app/features/viewSortingCurve/archetypes/sortableView.archetype";
import { wallArchetype } from "@root/app/features/wall/archetypes/wall.archetype";
import { ConstructorOf } from "../../../common/types/constructor.types";
import { Entity } from "../../entities/models/entity.models";
import { actorArchetype } from "../common/actor.archetype";
import { colliderArchetype } from "../common/collider.archetype";
import { damagerArchetype } from "../common/damager.archetype";
import { mortalArchetype } from "../common/mortal.archetype";
import { Archetype } from "../models/archetype.models";

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
		mouseCoordinatesArchetype,
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