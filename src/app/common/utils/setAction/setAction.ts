import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { replaceAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/replaceAnimatedSprite";
import { configManager } from "@root/app/core/configManager/configManager.singleton";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxIsActive } from "@root/app/domains/hitbox/components/hitboxIsActive/hitboxIsActive.component";
import { HITBOX_BOUNDS } from "@root/app/domains/hitbox/constants/hitboxes.constants";
import { AnimatedSprite } from "pixi.js";
import { CBorderView } from "../../components/borderView/borderView.component";
import { CCenterView } from "../../components/centerView/centerView.component";
import { ANGLE_NAMES } from "../../constants/space.constants";
import { Entity } from "../../entities/entity.models";
import { TPoint } from "../../types/point.type";
import { replaceBorder } from "../../views/utils/borderView/replaceBorderView";
import { replaceCenterView } from "../../views/utils/centerView/replaceCenterView";
import { replaceViewSortingCurveView } from "@root/app/domains/viewSortingCurve/utils/replaceViewSortingCurveView/replaceViewSortingCurveView";
import { replaceHitboxBorderView } from "../../views/utils/hitboxBorderView/replaceHitboxBorderView";

type TOptions = {
	onLoop?:        AnimatedSprite["onLoop"] | null,
	onComplete?:    AnimatedSprite["onComplete"] | null,
	onFrameChange?: ((currentFrame: number, clear?: () => void) => void) | null,
}

export const setAction = (
	actorEntity: Entity,
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

	const viewMustBeUpdated = actionComponent.currentAction !== action || directionComponent.direction8 !== ANGLE_NAMES.get(direction);

	directionComponent.direction = direction;
	actionComponent.currentAction = action;

	if (viewMustBeUpdated) {
		// prevent the current animation from continuing after being changed, triggering events such as onComplete or onFrameChange
		viewComponent.view.stop();

		replaceAnimatedSprite(
			viewComponent,
			`characters.${actorEntity.name}.${action}.${directionComponent.direction8}`,
			locationComponent.coordinates,
		);
		if (configManager.config.debug.showsEntityBorders) {
			replaceBorder(viewComponent, borderViewComponent, locationComponent.coordinates);
		}
		if (configManager.config.debug.showsEntityCenters) {
			replaceCenterView(
				centerViewComponent,
				`characters.${actorEntity.name}`,
				locationComponent.coordinates,
			);
		}
		if (configManager.config.debug.showsViewSortingCurves) {
			replaceViewSortingCurveView(
				actorEntity,
				locationComponent.coordinates,
			);
		}

		if (configManager.config.debug.showsEntityHitboxes && actorEntity.relations.has("hitboxes")) {
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

					replaceHitboxBorderView(
						hitboxEntity,
						locationComponent.coordinates,
						bounds,
					);
				});
		}

		if (actorEntity.name === "muddyBuddy") {
			const hitboxEntities = actorEntity.getRelatedEntities("hitboxes");

			const damageHitboxEntity = hitboxEntities.find(hitboxEntity => {
				const hitboxComponent = hitboxEntity.getComponent(CHitbox);

				return hitboxComponent.type === "damage";
			});

			if (!damageHitboxEntity) {
				throw new Error("Missing damage hitbox.");
			}

			const hitboxIsActiveComponent = damageHitboxEntity.getComponent(CHitboxIsActive);

			hitboxIsActiveComponent.hitboxIsActive = action === "rolling";
		}
	}

	if (options.onLoop) {
		viewComponent.view.onLoop = options.onLoop;
	}
	if (options.onComplete) {
		viewComponent.view.onComplete = options.onComplete;
	}
	if (options.onFrameChange) {
		viewComponent.view.onFrameChange = (currentFrame: number) => {
			if (!options.onFrameChange) throw new Error("Options were altered since setting up the action.");
			const clear = () => {
				viewComponent.view.onFrameChange = undefined;
			};
			options.onFrameChange(
				currentFrame,
				clear,
			);
		};
	}
};