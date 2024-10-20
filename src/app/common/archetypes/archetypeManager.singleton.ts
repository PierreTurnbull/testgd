import { ConstructorOf } from "../types/constructor.types";
import { actorArchetype } from "./actor/actor.archetype";
import { Archetype } from "./archetype.models";
import { colliderArchetype } from "./collider/collider.archetype";
import { fpsArchetype } from "./fps/fps.archetype";
import { muddyBuddyArchetype } from "./muddyBuddy/muddyBuddy.archetype";
import { orderableViewArchetype } from "./orderableView/orderableView.archetype";
import { playerArchetype } from "./player/player.archetype";
import { projectileArchetype } from "./projectile/projectile.archetype";

class ArchetypeManager {
	archetypes: Archetype[] = [
		playerArchetype,
		muddyBuddyArchetype,
		actorArchetype,
		fpsArchetype,
		colliderArchetype,
		orderableViewArchetype,
		projectileArchetype,
	];

	getArchetype<TArchetype extends Archetype>(archetypeClass: ConstructorOf<TArchetype>) {
		const archetype = this.archetypes.find(archetype => archetype instanceof archetypeClass);
		if (!archetype) throw new Error(`Archetype ${archetypeClass.name} not found.`);
		const instanceMatchesClass =  ((archetype: Archetype): archetype is TArchetype => archetype instanceof archetypeClass)(archetype);
		if (!instanceMatchesClass) throw new Error(`Archetype ${archetype.constructor.name} does match class ${archetypeClass.name}.`);
		return archetype;
	};

	getEntitiesByArchetype<TArchetype extends Archetype>(archetypeClass: ConstructorOf<TArchetype>) {
		const archetype = this.getArchetype(archetypeClass);
		return archetype.entities;
	}
}

export const archetypeManager = new ArchetypeManager();