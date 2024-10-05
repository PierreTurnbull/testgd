import { animatedSpritesManager } from "@root/app/common/animatedSprites/animatedSpritesManager.singletons";
import { replaceAnimatedSprite } from "@root/app/common/animatedSprites/utils/replaceAnimatedSprite";
import { AActor } from "@root/app/common/archetypes/actor/actor.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.entity";

type TOptions = {
	onLoop?: (() => void) | null,
	onComplete?: (() => void) | null,
}

export const setAction = (
	actorEntity: AActor["entities"][number],
	action: CAction["currentAction"],
	direction: CDirection["direction"],
	options: TOptions = {},
) => {
	const actionComponent = actorEntity.getComponent(CAction);
	const directionComponent = actorEntity.getComponent(CDirection);
	const locationComponent = actorEntity.getComponent(CLocation);
	const viewComponent = actorEntity.getComponent(CView);

	directionComponent.direction = direction;
	actionComponent.currentAction = action;
	replaceAnimatedSprite(
		viewComponent,
		viewComponent.animatedSprite,
		animatedSpritesManager.animatedSprites[`characters.player.${action}.${direction}`],
		locationComponent.coordinates,
	);
	if (options.onLoop) {
		viewComponent.animatedSprite.onLoop = options.onLoop;
	}
	if (options.onComplete) {
		viewComponent.animatedSprite.onComplete = options.onComplete;
	}
};