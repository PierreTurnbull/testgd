import { AActor } from "@root/app/common/archetypes/actor/actor.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { replaceAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/replaceAnimatedSprite";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { AnimatedSprite } from "pixi.js";
import { CBorderView } from "../../components/border/border.component";
import { CCenterView } from "../../components/centerView/centerView.component";
import { replaceBorder } from "../../views/utils/border/replaceBorder";
import { replaceCenterView } from "../../views/utils/center/replaceCenter";
import { replaceHitboxBorder } from "../../views/utils/hitboxBorder/replaceHitboxBorder";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { HITBOX_BOUNDS } from "@root/app/domains/hitbox/constants/hitboxes.constants";
import { TPoint } from "../../types/point.type";

type TOptions = {
	onLoop?:        AnimatedSprite["onLoop"] | null,
	onComplete?:    AnimatedSprite["onComplete"] | null,
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
	const borderViewComponent = actorEntity.getComponent(CBorderView);
	const centerViewComponent = actorEntity.getComponent(CCenterView);

	directionComponent.direction = direction;
	actionComponent.currentAction = action;

	replaceAnimatedSprite(
		viewComponent,
		`characters.${actorEntity.name}.${action}.${direction}`,
		locationComponent.coordinates,
	);
	if (configManager.config.debug.showsEntityBorders) {
		replaceBorder(viewComponent, borderViewComponent, locationComponent.coordinates);
	}
	if (configManager.config.debug.showsEntityCenter) {
		replaceCenterView(
			centerViewComponent,
			`characters.${actorEntity.name}`,
			locationComponent.coordinates,
		);
	}

	if (configManager.config.debug.showsEntityHitbox && actorEntity.hasRelation("hitboxes")) {
		const hitboxEntities = actorEntity.getRelatedEntities("hitboxes");

		hitboxEntities
			.filter(hitboxEntity => hitboxEntity.getComponent(CHitbox).type === "motion")
			.forEach((hitboxEntity) => {
				const hitboxComponent = hitboxEntity.getComponent(CHitbox);

				const hitboxBounds = HITBOX_BOUNDS[hitboxComponent.name];
				if (!hitboxBounds) {
					throw new Error(`Missing bounds for hitbox "${hitboxComponent.name}".`);
				}

				const bounds: TPoint[] = [
					{
						x: 0,
						y: 0,
					},
					{
						x: hitboxBounds.w,
						y: 0,
					},
					{
						x: hitboxBounds.w,
						y: hitboxBounds.h,
					},
					{
						x: 0,
						y: hitboxBounds.h,
					},
				];

				replaceHitboxBorder(
					hitboxEntity,
					locationComponent.coordinates,
					bounds,
				);
			});
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