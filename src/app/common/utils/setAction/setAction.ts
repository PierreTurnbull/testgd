import { replaceAnimatedSprite } from "@root/app/common/animatedSprites/utils/animatedSprite/replaceAnimatedSprite";
import { AActor } from "@root/app/common/archetypes/actor/actor.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { AnimatedSprite } from "pixi.js";
import { replaceBorder } from "../../animatedSprites/utils/border/replaceBorder";
import { replaceHitboxBorder } from "../../animatedSprites/utils/hitboxBorder/replaceHitboxBorder";
import { CHitboxView } from "../../components/hitboxView/hitboxView.component";
import { replaceCenterView } from "../../animatedSprites/utils/center/replaceCenterView";
import { CCenterView } from "../../components/centerView/centerView.component";

type TOptions = {
	onLoop?: AnimatedSprite["onLoop"] | null,
	onComplete?: AnimatedSprite["onComplete"] | null,
	onFrameChange?: ((currentFrame: number, clear?: () => void) => void) | null,
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
	const hitboxViewComponent = actorEntity.getComponent(CHitboxView);
	const centerViewComponent = actorEntity.getComponent(CCenterView);

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
	if (configManager.config.debug.showsEntityHitbox) {
		replaceHitboxBorder(
			hitboxViewComponent,
			`characters.${actorEntity.name}`,
			locationComponent.coordinates,
		);
	}
	if (configManager.config.debug.showsEntityCenter) {
		replaceCenterView(
			centerViewComponent,
			`characters.${actorEntity.name}`,
			locationComponent.coordinates,
		);
	}

	if (options.onLoop) {
		viewComponent.animatedSprite.onLoop = options.onLoop;
	}
	if (options.onComplete) {
		viewComponent.animatedSprite.onComplete = options.onComplete;
	}
	if (options.onFrameChange) {
		viewComponent.animatedSprite.onFrameChange = (currentFrame: number) => {
			if (!options.onFrameChange) throw new Error("Options were altered since setting up the action.");
			const clear = () => {
				viewComponent.animatedSprite.onFrameChange = undefined;
			};
			options.onFrameChange(
				currentFrame,
				clear,
			);
		};
	}
};