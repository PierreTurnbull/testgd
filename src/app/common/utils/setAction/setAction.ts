import { replaceAnimatedSprite } from "@root/app/common/animatedSprites/utils/animatedSprite/replaceAnimatedSprite";
import { AActor } from "@root/app/common/archetypes/actor/actor.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { replaceBorder } from "../../animatedSprites/utils/border/replaceBorder";
import { replaceHitboxBorder } from "../../animatedSprites/utils/hitboxBorder/replaceHitboxBorder";
import { CHitboxView } from "../../components/hitboxView/hitboxView.component";
import { CHitbox } from "../../components/hitbox/hitbox.component";
import { configManager } from "@root/app/core/configManager/configManager.singletons";

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
	const hitboxComponent = actorEntity.getComponent(CHitbox);
	const hitboxViewComponent = actorEntity.getComponent(CHitboxView);

	directionComponent.direction = direction;
	actionComponent.currentAction = action;
	replaceAnimatedSprite(
		viewComponent,
		`characters.${actorEntity.name}.${action}.${direction}`,
		locationComponent.coordinates,
	);
	if (configManager.config.debug.showsEntityBorders) {
		replaceBorder(viewComponent, locationComponent.coordinates);
	}
	if (configManager.config.debug.showsEntityHitboxes) {
		replaceHitboxBorder(
			hitboxComponent,
			hitboxViewComponent,
			`characters.${actorEntity.name}`,
			locationComponent.coordinates,
		);
	}
	if (viewComponent.animatedSprite && options.onLoop) {
		viewComponent.animatedSprite.onLoop = options.onLoop;
	}
	if (viewComponent.animatedSprite && options.onComplete) {
		viewComponent.animatedSprite.onComplete = options.onComplete;
	}
};